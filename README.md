# wampy-cryptosign

[WAMP][] Cryptosign-based Authentication plugin for [Wampy.js][].

## Description

wampy-cryptosign exposes 3 methods:

* hex2bytes(str). Helper method to convert hex string to bytes array.
* bytes2hex(bytes). Helper method to convert bytes array to hex string.
* **sign(privateKey)**. Probably the only function you need. Used to automatically create a
  Ed25519 signature for challenge message, using private key. This function can be passed as onChallenge callback.

See examples in Wampy.js docs section
["Cryptosign-based Authentication"](https://github.com/KSDaemon/wampy.js#cryptosign-based-authentication)

Thanks JetBrains for the best IDEs and support for open source!

[![jetbrains logo]][jetbrains url]

[Wampy.js]: https://github.com/KSDaemon/wampy.js
[WAMP]: http://wamp-proto.org/

[npm-url]: https://www.npmjs.com/package/wampy-cryptosign
[npm-image]: https://img.shields.io/npm/v/wampy-cryptosign.svg?style=flat

[gh-build-test-url]: https://github.com/KSDaemon/wampy-cryptosign/actions/workflows/build-and-test.yml
[gh-build-test-image]: https://github.com/KSDaemon/wampy-cryptosign/actions/workflows/build-and-test.yml/badge.svg

[coveralls-url]: https://coveralls.io/github/KSDaemon/wampy-cryptosign
[coveralls-image]: https://img.shields.io/coveralls/KSDaemon/wampy-cryptosign/master.svg?style=flat

[license-image]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: http://opensource.org/licenses/MIT

[snyk-image]: https://snyk.io/test/github/KSDaemon/wampy-cryptosign/badge.svg?targetFile=package.json
[snyk-url]: https://snyk.io/test/github/KSDaemon/wampy-cryptosign?targetFile=package.json

[jetbrains logo]: jetbrains.svg
[jetbrains url]: (https://www.jetbrains.com)
