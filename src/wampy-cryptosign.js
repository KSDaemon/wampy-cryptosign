/**
 * Project: wampy-cryptosign.js
 *
 * https://github.com/KSDaemon/wampy-cryptosign
 *
 * Wampy.js Cryptosign-based Authentication plugin
 *
 * Copyright 2022 KSDaemon. Licensed under the MIT License.
 * See @license text at http://www.opensource.org/licenses/mit-license.php
 *
 */

import { sign as NaclSign } from 'tweetnacl';

export function hex2bytes(str) {
    // Converting hex string to array of bytes
    let l = str.length, strBytes = new Uint8Array(l / 2)

    for (let i = 0; i < l; i += 2) {
        strBytes[i / 2] = parseInt(str.substring(i, i + 2), 16)
    }

    return strBytes;
}

export function bytes2hex(bytes) {
    if (bytes) {
        return Array.from(bytes, function (byte) {
            return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join('');
    } else {
        return null;
    }
}

export function sign(privateKey) {
    let keyPair;

    if (privateKey.length === 64) {
        keyPair = NaclSign.keyPair.fromSeed(hex2bytes(privateKey))
    } else {
        keyPair = NaclSign.keyPair.fromSecretKey(hex2bytes(privateKey))
    }

    return function (method, info) {
        if (method === 'cryptosign') {
            let l, signature;

            if (!info.challenge) {
                throw new Error('No challenge provided!');
            }

            l = info.challenge.length;
            if ((l % 2) !== 0) {
                throw new Error('Expected challenge to be an even number of characters!');
            }
            signature = NaclSign.detached(hex2bytes(info.challenge), keyPair.secretKey);

            return bytes2hex(signature) + info.challenge;

        } else {
            throw new Error('Unknown authentication method requested!');
        }
    };
}

export default sign;
