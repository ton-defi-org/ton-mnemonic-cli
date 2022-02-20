# Ton Mnemonic CLI

> CLI tool that helps to fetch information from mnemonic and helps to parse transfer transaction data from a boc file.

## Installation

`npm install --save `

## Fetching Usage Example

```bash
npx ton-mnemonic-cli fetch 0 mnemonic1 mnemonic2 ... mnemonic24
```

## Expected Result

```bash
PublicKey:
9ZuBBlzprR9eXQgSYGEXiUEHm7yYF9ZuBBlzprR9eXQgSYGEXiUEHm7yYF9ZuBBl

PrivateKey:
Wp9ZuBBlzprR9eXQgSYGEXiUEHm7yYFWp9ZuBBlzprR=

Private key generated at /Users/ton/key.pk 

Wallet Address simpleR1:
EQBP4mzpDIywL1SV-Wp9ZuBBlzprR9eXQgSYGEXiUEHm7yYF

Wallet Address simpleR2:
EQBP4mzpDIywL1SV-Wp9ZuBBlzprR9eXQgSYGEXiUEHm7yYF

Wallet Address simpleR3:
EQBP4mzpDIywL1SV-Wp9ZuBBlzprR9eXQgSYGEXiUEHm7yYF

Wallet Address v2R1:
EQBP4mzpDIywL1SV-Wp9ZuBBlzprR9eXQgSYGEXiUEHm7yYF

Wallet Address v2R2:
EQBP4mzpDIywL1SV-Wp9ZuBBlzprR9eXQgSYGEXiUEHm7yYF

Wallet Address v3R1:
EQBP4mzpDIywL1SV-Wp9ZuBBlzprR9eXQgSYGEXiUEHm7yYF

Wallet Address v3R2:
EQBP4mzpDIywL1SV-Wp9ZuBBlzprR9eXQgSYGEXiUEHm7yYF

Wallet Address v4R2:
EQBP4mzpDIywL1SV-Wp9ZuBBlzprR9eXQgSYGEXiUEHm7yYF

Wallet Address v4R1:
EQBP4mzpDIywL1SV-Wp9ZuBBlzprR9eXQgSYGEXiUEHm7yYF
```

## Parsing Usage Example

```bash
npx ton-mnemonic-cli parse ./transfer.boc
```

## Expected Result

```bash
flags 18
EQBP4mzpDIywL1SV-Wp9ZuBBlzprR9eXQgSYGEXiUEHm7yYF
50000000
```
