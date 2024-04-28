!(function (i) {
  var n = {};
  function s(t) {
    var e;
    return (
      n[t] ||
      ((e = n[t] = { i: t, l: !1, exports: {} }),
      i[t].call(e.exports, e, e.exports, s),
      (e.l = !0),
      e)
    ).exports;
  }
  (s.m = i),
    (s.c = n),
    (s.d = function (t, e, i) {
      s.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: i });
    }),
    (s.r = function (t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (s.t = function (e, t) {
      if ((1 & t && (e = s(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var i = Object.create(null);
      if (
        (s.r(i),
        Object.defineProperty(i, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var n in e)
          s.d(
            i,
            n,
            function (t) {
              return e[t];
            }.bind(null, n)
          );
      return i;
    }),
    (s.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return s.d(e, "a", e), e;
    }),
    (s.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (s.p = ""),
    s((s.s = 0));
})([
  function (i, t, e) {
    !function (t) {
      function e({ url: t, loop: e = !1 }) {
        (this.url = t),
          (this.loop = e || !1),
          (this.audioContext = null),
          (this.source = null),
          (this.analyser = null),
          (this.gain = null),
          (this._fftsize = 32),
          (this.frequency = null),
          (this.state = !1),
          (this.audiostate = 0),
          this.init();
      }
      (e.prototype = {
        get currentTime() {
          return this.audioContext && this.audioContext.currentTime;
        },
        async init() {
          this.initAudioContext(),
            this.intiAnalyser(),
            await this.initAudioSource(),
            this.initGain(),
            (this.state = !0);
        },
        initAudioContext() {
          window.AudioContext ||
            window.webkitAudioContext ||
            window.mozAudioContext ||
            window.msAudioContext,
            (this.audioContext = new window.AudioContext()),
            this.audioContext.suspend();
        },
        intiAnalyser() {
          (this.analyser = this.audioContext.createAnalyser()),
            (this.analyser.smoothingTimeConstant = 0.9),
            this.setFftSzie(this._fftsize);
        },
        async initAudioSource() {
          var t = await this._getAudioData(),
            t = await this.audioContext.decodeAudioData(t);
          (this.source = this.audioContext.createBufferSource()),
            (this.source.buffer = t),
            this.source.connect(this.analyser),
            this.analyser.connect(this.audioContext.destination),
            (this.source.loop = this.loop);
        },
        initGain() {
          (this.gain = this.audioContext.createGain()),
            this.source.connect(this.gain),
            this.gain.connect(this.audioContext.destination),
            this.setVoiceSize(10);
        },
        initFrequency() {
          this.frequency = new Uint8Array(this.analyser.frequencyBinCount);
        },
        setVoiceSize(t) {
          this.gain.gain.setValueAtTime(t / 10, this.audioContext.currentTime),
            this.initFrequency();
        },
        setFftSzie(t) {
          this.analyser.fftSize = 2 * t;
        },
        async _getAudioData() {
          return (await fetch(this.url)).arrayBuffer();
        },
        _forFrequency() {
          this.analyser.getByteFrequencyData(this.frequency);
        },
        exex(t) {
          clearInterval(this.timerIndex),
            (this.timerIndex = setInterval(() => {
              this._forFrequency(),
                t &&
                  t({
                    frequency: Array.from(this.frequency),
                    currentTime: this.currentTime,
                    audiostate: this.audiostate,
                  });
            }, 0));
        },
        play(t) {
          if (3 === this.audiostate)
            throw new Error("已经停止无法继续请重新new一个对象");
          const e = setInterval(() => {
            this.state &&
              (clearInterval(e),
              0 === this.audiostate
                ? this.start()
                : 3 != this.audiostate && 1 != this.audiostate && this.resume(),
              this.exex(t));
          }, 0);
        },
        start() {
          this.resume(), this.source.start(0), (this.audiostate = 1);
        },
        stop() {
          (this.audiostate = 3), this.audioContext.close();
        },
        suspend() {
          (this.audiostate = 2), this.audioContext.suspend();
        },
        resume() {
          (this.audiostate = 1), this.audioContext.resume();
        },
        destroy() {
          clearInterval(this.timerIndex),
            this.source && (this.source.stop(), this.source.disconnect()),
            this.analyser.disconnect(),
            this.gain.disconnect(),
            this.audioContext.close(),
            (this.state = !1),
            (this.audiostate = 3),
            (this.audioContext = null),
            (this.source = null),
            (this.analyser = null),
            (this.gain = null),
            (this.frequency = null);
        },
      }),
        "undefined" != typeof window
          ? (window.AudioVisualization = e)
          : void 0 !== t && (t.AudioVisualization = e),
        void 0 !== i.exports && (i.exports = e);
    }.call(this, e(1));
  },
  function (t, e) {
    var i = (function () {
      return this;
    })();
    try {
      i = i || new Function("return this")();
    } catch (t) {
      "object" == typeof window && (i = window);
    }
    t.exports = i;
  },
]);
