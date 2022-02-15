#!/usr/bin/env node

import TonWeb from "tonweb";
import tonMnemonic from "tonweb-mnemonic";
import fs from "fs";
// import bip39 from "bip39";

const nacl = TonWeb.utils.nacl;
const DEFAULT_WALLET_VERSION = 'v3R2';

function toHexString(byteArray) {
    return Array.prototype.map.call(byteArray, function (byte) {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');
}

async function privateKey2KeyPair(privateKey) {
    const keyPair = nacl.sign.keyPair.fromSeed(TonWeb.utils.base64ToBytes(privateKey));
    console.log(keyPair);
    return keyPair;
}

async function mnemonic2PrivateKey(mnemonicWords) {
    console.log(mnemonicWords);
    const keyPair = await tonMnemonic.mnemonicToKeyPair(mnemonicWords);
    const publicKeyHex = toHexString(keyPair.publicKey);
    console.log("PublicKey: " + "\n" + publicKeyHex + "\n");
    const privateKeyBase64 = TonWeb.utils.bytesToBase64(keyPair.secretKey.slice(0, 32));
    console.log("PrivateKey: " + "\n" + privateKeyBase64 + "\n");
    // fs.writeFileSync("key.pk", keyPair.secretKey.slice(0, 32));
    fs.writeFileSync("key.pk", TonWeb.utils.base64ToBytes(privateKeyBase64));
    console.log("Private key generated at " + process.cwd() + "/key.pk \n")
    return [publicKeyHex, privateKeyBase64, keyPair.publicKey];
}

async function getWalletAddress(publicKey, wc) {
    const ton = new TonWeb();
    // const mainnetRpc = 'https://toncenter.com/api/v2/jsonRPC';
    // const ton = new TonWeb(new TonWeb.HttpProvider(mainnetRpc));
    const WalletClass = ton.wallet.all[DEFAULT_WALLET_VERSION];
    const walletContract = new WalletClass(ton.provider, {
        publicKey: publicKey,
        wc: wc
    });
    const address = (await walletContract.getAddress()).toString(true, true, true);
    console.log("WalletAddress:" + "\n" + address);
}

(async () => {
    const wc = process.argv[2]
    const myMnemonicWords = process.argv.slice(3);
    // if (!bip39.validateMnemonic(myMnemonicWords.join(" "))) {
    //     console.error("Validation Failed");
    // }
    const res = await mnemonic2PrivateKey(myMnemonicWords);
    await getWalletAddress(res[2], parseInt(wc))
})();