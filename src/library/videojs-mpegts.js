/**
 * videojs-mpegtsjs
 *
 * Apache-2.0 License
 * Copyright (c) Kewell <kewell.tsao@qq.com>
 * https://e.coding.net/kewell/ffmpeg/videojs-mpegtsjs.git
 *
 * Modified by Jack'lul <jacklulcat@gmail.com>
 */
(function(f) {
    if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = f()
    } else if (typeof define === "function" && define.amd) {
        define([], f)
    } else {
        var g;
        if (typeof window !== "undefined") {
            g = window
        } else if (typeof global !== "undefined") {
            g = global
        } else if (typeof self !== "undefined") {
            g = self
        } else {
            g = this
        }
        g.videojsMpegTsJs = f()
    }
})(function() {
    var define, module, exports;
    return (function() {
        function r(e, n, t) {
            function o(i, f) {
                if (!n[i]) {
                    if (!e[i]) {
                        var c = "function" == typeof require && require;
                        if (!f && c) return c(i, !0);
                        if (u) return u(i, !0);
                        var a = new Error("Cannot find module '" + i + "'");
                        throw a.code = "MODULE_NOT_FOUND", a
                    }
                    var p = n[i] = {
                        exports: {}
                    };
                    e[i][0].call(p.exports, function(r) {
                        var n = e[i][1][r];
                        return o(n || r)
                    }, p, p.exports, r, e, n, t)
                }
                return n[i].exports
            }
            for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
            return o
        }
        return r
    })()({
        1: [function(require, module, exports) {
            (function(global) {
                (function() {
                    if (typeof window !== "undefined") {
                        module.exports = window;
                    } else if (typeof global !== "undefined") {
                        module.exports = global;
                    } else if (typeof self !== "undefined") {
                        module.exports = self;
                    } else {
                        module.exports = {};
                    }
                }).call(this)
            }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
        }, {}],
        2: [function(require, module, exports) {
            (function(global) {
                (function() {
                    "use strict";

                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });

                    exports.default = void 0;

                    var _videojs = _interopRequireDefault((typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null));
                    var _mpegts = _interopRequireDefault((typeof window !== "undefined" ? window['mpegts'] : typeof global !== "undefined" ? global['mpegts'] : null));
                    var _window = _interopRequireDefault(require("global/window"));

                    var _isOnMobile = _videojs.default.browser.IS_IOS || _videojs.default.browser.IS_NATIVE_ANDROID;

                    function _interopRequireDefault(obj) {
                        return obj && obj.__esModule ? obj : {
                            default: obj
                        };
                    }

                    const Html5 = _videojs.default.getTech('Html5');

                    const mergeOptions = _videojs.default.obj ? _videojs.default.obj.merge : _videojs.default.mergeOptions || _videojs.default.util.mergeOptions;

                    const defaults = {
                        mediaDataSource: {},
                        config: {}
                    };

                    class MpegTsJs extends Html5 {
                        constructor(options, ready) {
                            options = mergeOptions(defaults, options);

                            super(options, ready);
                        }

                        dispose() {
                            if (this.mpegtsPlayer) {
                                this.mpegtsPlayer.detachMediaElement();
                                this.mpegtsPlayer.destroy();
                            }

                            super.dispose();
                        }

                        setSrc(src) {
                            if (this.mpegtsPlayer) {
                                this.mpegtsPlayer.unload();
                                this.mpegtsPlayer.detachMediaElement();
                                this.mpegtsPlayer.destroy();
                            }

                            this.isLoaded = false;

                            const mediaDataSource = this.options_.mediaDataSource;
                            const config = this.options_.config;

                            mediaDataSource.type = mediaDataSource.type === undefined ? 'mpegts' : mediaDataSource.type;
                            mediaDataSource.url = src;

                            this.mpegtsPlayer = _mpegts.default.createPlayer(mediaDataSource, config);
                            this.mpegtsPlayer.attachMediaElement(this.el_);

                            if (this.options_.autoplay) {
                                if (this.isReady_) {
                                    this.play();
                                } else {
                                    this.playOnReady = true;
                                    this.load();
                                }
                            }

                            this.mpegtsPlayer.on('error', (event) => {
                                this.errorNumber = 1;
                                this.errorMessage = event;

                                this.trigger('pause');
                                this.trigger('error');
                            });
                        }

                        autoplay() {
                            return this.options_.autoplay;
                        }

                        setAutoplay(val) {
                            this.options_.autoplay = val;
                        }

                        load() {
                            if (!this.isLoaded) {
                                this.trigger('waiting');

                                this.mpegtsPlayer.load();
                                this.isLoaded = true;

                                if (this.playOnReady) {
                                    this.play();
                                }
                            }
                        }

                        play() {
                            if (this.isReady_ && this.isLoaded) {
                                const playPromise = this.mpegtsPlayer.play();

                                if (playPromise !== undefined) {
                                    playPromise.catch(error => {});
                                }
                            } else {
                                this.playOnReady = true;
                                this.load();
                            }
                        }

                        pause() {
                            if (this.mpegtsPlayer) {
                                this.mpegtsPlayer.pause();
                            }
                        }

                        error() {
                            return { code: 1000 + this.errorNumber, message: 'MpegTsJs error: ' + this.errorMessage };
                        }
                    }

                    MpegTsJs.isSupported = function() {
                        return _mpegts.default && _mpegts.default.isSupported();
                    };

                    MpegTsJs.formats = {
                        'video/mp2t': 'TS',
                    };

                    MpegTsJs.canPlayType = function(type) {
                        if (type) {
                            type = type.toLowerCase();
                        }

                        if (MpegTsJs.isSupported() && type in MpegTsJs.formats) {
                            return 'maybe';
                        }

                        return '';
                    };

                    MpegTsJs.canPlaySource = function(srcObj, options) {
                        return MpegTsJs.canPlayType(srcObj.type);
                    };

                    MpegTsJs.VERSION = '1.0.1';

                    _videojs.default.registerTech('MpegTsJs', MpegTsJs);
                    var _default = exports.default = MpegTsJs;
                }).call(this)
            }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
        }, {
            "global/window": 1
        }]
    }, {}, [2])(2)
});
