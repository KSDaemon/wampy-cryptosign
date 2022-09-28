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

// Module boilerplate to support browser globals and browserify and AMD.
const crypto = require("tweetnacl");
(
    typeof define === 'function' ? function (m) {
        define('WampyCryptosign', m);
    } :
        typeof exports === 'object' ? function (m) {
            module.exports = m();
        } :
            function (m) {
                this.WampyCryptosign = m();
            }
)(function () {

    const WampyCryptosign = {},
        crypto = require('tweetnacl');

    function hex2bytes (str) {
        // Converting hex string to array of bytes
        let l = str.length, strBytes = new Uint8Array(l / 2)

        for (let i = 0; i < l; i += 2) {
            strBytes[i / 2] = parseInt(str.substring(i, i + 2), 16)
        }

        return strBytes;
    }

    function bytes2hex (bytes) {
        if (bytes) {
            return Array.from(bytes, function(byte) {
                return ('0' + (byte & 0xFF).toString(16)).slice(-2);
            }).join('');
        } else {
            return null;
        }
    }

    function sign (privateKey) {
        let keyPair;

        if (privateKey.length === 64) {
            keyPair = crypto.sign.keyPair.fromSeed(hex2bytes(privateKey))
        } else {
            keyPair = crypto.sign.keyPair.fromSecretKey(hex2bytes(privateKey))
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
                signature = crypto.sign.detached(hex2bytes(info.challenge), keyPair.secretKey);

                return bytes2hex(signature) + info.challenge;

            } else {
                throw new Error('Unknown authentication method requested!');
            }
        };
    }

    WampyCryptosign.hex2bytes = hex2bytes;
    WampyCryptosign.bytes2hex = bytes2hex;
    WampyCryptosign.sign = sign;

    return WampyCryptosign;

});
