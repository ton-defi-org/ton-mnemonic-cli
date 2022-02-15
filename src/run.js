#!/usr/bin/env node

import TonWeb from "tonweb";
import tonMnemonic from "tonweb-mnemonic";
import fs from "fs";
// import bip39 from "bip39";

const nacl = TonWeb.utils.nacl;
const DEFAULT_WALLET_VERSION = 'v3R2';

const WALLET_VERSIONS = ['simpleR1', 'simpleR2', 'simpleR3', 'v2R1', 'v2R2', 'v3R1', 'v3R2', 'v4R1', 'v4R2'];

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

async function getWalletAddress(publicKey, wc, walletVersion) {
    const ton = new TonWeb();
    // const mainnetRpc = 'https://toncenter.com/api/v2/jsonRPC';
    // const ton = new TonWeb(new TonWeb.HttpProvider(mainnetRpc));
    const WalletClass = ton.wallet.all[walletVersion];
    const walletContract = new WalletClass(ton.provider, {
        publicKey: publicKey,
        wc: wc
    });
    const address = (await walletContract.getAddress()).toString(true, true, true);
    console.log("Wallet Address " + walletVersion + ":\n" + address + "\n");
}

(async () => {
    const wc = process.argv[2]
    const mnemonicWords = process.argv.slice(3);
    // if (!bip39.validateMnemonic(mnemonicWords.join(" "))) {
    //     console.error("Validation Failed");
    // }
    console.log(mnemonicWords);
    console.log();
    const res = await mnemonic2PrivateKey(mnemonicWords);

    WALLET_VERSIONS.forEach(async walletVersion => {
        await getWalletAddress(res[2], parseInt(wc), walletVersion);
    });
})();