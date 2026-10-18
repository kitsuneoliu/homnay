/* ===== tiny-performance-profile ===== */
window.TINY_PERF = (() => {
  const qs = new URLSearchParams(location.search);
  const quality = qs.get('tinyfx');
  const touch = matchMedia('(pointer:coarse)').matches;
  const constrained = touch || (navigator.deviceMemory && navigator.deviceMemory <= 6)
     || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
  const mobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || (touch && matchMedia('(max-width:900px)').matches && !/Windows|Macintosh|X11/i.test(navigator.userAgent));
  const lite = mobile || (quality === 'full' ? false : quality === 'lite' ? true : !!constrained);
  document.documentElement.classList.toggle('tiny-lite', lite);
  document.documentElement.classList.toggle('tiny-mobile', mobile);
  
  
  const maxCanvasPixels = mobile ? 250000 : lite ? 1250000 : 2100000;
  function canvasDpr(w,h,maxDpr=1.6) {
    return Math.max(mobile ? .42 : .55, Math.min(devicePixelRatio || 1,
      mobile ? .68 : lite ? 1.15 : maxDpr,
      Math.sqrt(maxCanvasPixels / Math.max(1, w*h))));
  }
  return { lite, mobile, canvasDpr, ambientFps: mobile ? 24 : lite ? 24 : 60,
    roverFps:mobile ? 30 : lite ? 30 : 60,
    orbitFps:mobile ? 24 : lite ? 24 : 60,
    leafFps: mobile ? 24 : lite ? 24 : 60 };

})();

/* ===== (không id) ===== */
const text1 = document.getElementById('text-1');
        const text2 = document.getElementById('text-2');
        const text3 = document.getElementById('text-3');
        const text4 = document.getElementById('text-4');
        const text5 = document.getElementById('text-5');
        const text6 = document.getElementById('text-6');
        const text7 = document.getElementById('text-7');
        const text8 = document.getElementById('text-8');

        
        (()=>{
            const pairs=[['text-6','decor-want'],['text-7','decor-health'],['text-8','decor-beauty']]
                .map(([textId,decorId])=>[document.getElementById(textId),document.getElementById(decorId)]);
            const sync=()=>pairs.forEach(([label,decor])=>{
                if(label&&decor)decor.classList.toggle('is-visible',label.classList.contains('hien-thi'));
            });
            pairs.forEach(([label])=>{if(label)new MutationObserver(sync).observe(label,{attributes:true,attributeFilter:['class']});});
            sync();
        })();
        const text9 = document.getElementById('text-9');
        const text10 = document.getElementById('text-10');
        const text11 = document.getElementById('text-11');
        const text12 = document.getElementById('text-12');
        const text13 = document.getElementById('text-13');
        const wishBackdrop = document.getElementById('wish-backdrop');
        const beautyStage = document.getElementById('beauty-stage');
        const smileStage = document.getElementById('smile-stage');
        const cloverStage = document.getElementById('clover-stage');
        const luckStage = document.getElementById('luck-stage');
        const luckFrontField = document.getElementById('luck-front-field');
        const questionStage = document.getElementById('question-stage');
        const pinkOverlay = document.getElementById('pink-overlay');
        const vangOverlay = document.getElementById('vang-overlay');
        const xanhOverlay = document.getElementById('xanh-overlay');
        const anhHaiNguoi = document.getElementById('anh-hai-nguoi');
        const laCanvas = document.getElementById('laCanvas');
        let laDaChay = false;
        const natureCanvas = document.getElementById('natureCanvas');
        const khungMat = document.getElementById('khung-mat');
        const lowerStars = document.getElementById('lower-stars');
        const womanScene = document.getElementById('woman-scene');
        const uiverseStarfield = document.getElementById('uiverse-starfield');
        const saoVuTru = document.getElementById('sao-vu-tru');
        const vienVuTru = document.getElementById('vien-vu-tru');
        const moiRobot = document.getElementById('moi-robot');
        const trucXElements = document.querySelectorAll('.truc-x');
        const matElements = document.querySelectorAll('.con-mat');
        
        
        const tinySoundtrack = document.getElementById('tiny-soundtrack');
        const musicWaitHint = document.getElementById('music-wait-hint');
        const lyricZone = document.getElementById('tiny-lyric-zone');
        const lyricSlots = [document.getElementById('tiny-lyric-top'), document.getElementById('tiny-lyric-bottom')];

        const lyricCues = [{"time":1.4,"text":"chờ anh chút thôi"},{"time":3.0,"text":"khi mùa đông vừa sang"},{"time":5.6,"text":"xếp lại hết ngổn ngang"},{"time":8.0,"text":"chờ chút thôi"},{"time":8.9,"text":"rồi anh sẽ tìm tới"},{"time":12.6,"text":"chờ anh chút thôi"},{"time":14.3,"text":"đã phiền em phải đợi"},{"time":16.4,"text":"có anh ở đây rồi"},{"time":18.5,"text":"vẫn gần em thôi"},{"time":20.0,"text":"dù xa cách khung trời"},{"time":23.8,"text":"cầm tay anh, dựa vai anh"},{"time":25.5,"text":"kề bên anh, nơi này có anh"},{"time":27.5,"text":"gió mang câu tình ca"},{"time":29.0,"text":"ngàn ánh sao vụt qua"},{"time":30.6,"text":"nhẹ ôm lấy em"},{"time":33.5,"text":"cầm tay anh, dựa vai anh"},{"time":35.2,"text":"kề bên anh, nơi này có anh"},{"time":39.0,"text":"khép đôi mi thật lâu"},{"time":40.4,"text":"ước mai bên cạnh nhau"},{"time":41.8,"text":"yêu say đắm như ngày đầu"}];
        const MUSIC_HOLD_TIME = 5.6;
        const MUSIC_FADE_START = 5.05;
        const MUSIC_VOLUME = 0.84;
        let musicGateClosed = false;
        let musicAllowedPastGate = false;
        let musicPlayPending = false;
        let musicFadeTimer = null;
        let musicResumeFadeStart = 0;
        let musicSeekingResume = false;
        let lyricActiveIndex = -1;
        let lyricSlotIndex = -1;
        let lyricInterval = null;
        tinySoundtrack.volume = MUSIC_VOLUME;
        tinySoundtrack.muted = false;
        let musicHintTimer = null;
        const musicWaitMessages = ['đợi chút xíu đii', 'đợi chút nữa thui', 'xíu nữa', 'sắp được rùi', '1 chút thuii'];
        function showMusicWaitHint() {
            const msg = musicWaitMessages[Math.floor(Math.random() * musicWaitMessages.length)];
            musicWaitHint.textContent = msg;
            musicWaitHint.classList.add('show');
            clearTimeout(musicHintTimer);
            musicHintTimer = setTimeout(() => musicWaitHint.classList.remove('show'), 1700);
        }

        let musicPlayPromise = null;
        let musicVolumeFadeRAF = null;
        function cancelMusicVolumeFade() {
            if (musicVolumeFadeRAF !== null) { cancelAnimationFrame(musicVolumeFadeRAF); musicVolumeFadeRAF = null; }
        }

        function fadeMusicVolumeTo(target, durationMs = 450) {
            cancelMusicVolumeFade();
            const start = tinySoundtrack.volume;
            if (durationMs <= 0 || Math.abs(start - target) < .001) { tinySoundtrack.volume = target; return; }
            const t0 = performance.now();
            function step(now) {
                const p = Math.min(1, (now - t0) / durationMs);
                tinySoundtrack.volume = start + (target - start) * p;
                if (p < 1) musicVolumeFadeRAF = requestAnimationFrame(step);
                else musicVolumeFadeRAF = null;
            }
            musicVolumeFadeRAF = requestAnimationFrame(step);
        }

        function safePauseMusic() {
            cancelMusicVolumeFade();
            if (musicPlayPending && musicPlayPromise) {

                musicPlayPromise.then(() => { try { tinySoundtrack.pause(); } catch (_) {} }).catch(() => {});
                return;
            }
            try { tinySoundtrack.pause(); } catch (_) {}
        }

        function startMusicIfAllowed() {


            if (musicGateClosed && !musicAllowedPastGate) return;
            if (!tinySoundtrack.paused || musicPlayPending) return;
            let p;
            try { p = tinySoundtrack.play(); }
            catch (_) {
                tinySoundtrack.dataset.musicPlayback = 'tap-required';
                return;
            }
            if (p && typeof p.then === 'function') {
                musicPlayPending = true;
                musicPlayPromise = p;
                p.then(() => {
                    musicPlayPending = false;
                    musicPlayPromise = null;
                    tinySoundtrack.dataset.musicPlayback = 'playing';
                    musicWaitHint.classList.remove('show');
                }).catch((err) => {
                    musicPlayPending = false;
                    musicPlayPromise = null;

                    if (err && err.name === 'AbortError') return;
                    tinySoundtrack.dataset.musicPlayback = 'tap-required';

                    if (musicAllowedPastGate) {
                        tinySoundtrack.volume = MUSIC_VOLUME;
                        musicWaitHint.textContent = 'chạm lại để bật nhạc';
                        musicWaitHint.classList.add('show');
                    }
                });
            } else {
                tinySoundtrack.dataset.musicPlayback = 'playing';
            }
        }

        function musicFadeAndHold() {

            if (musicAllowedPastGate || musicGateClosed) return;
            const t = tinySoundtrack.currentTime || 0;
            if (t >= MUSIC_HOLD_TIME - .02) {
                musicGateClosed = true;
                scheduleIntroNudge(2000);
                if (musicFadeTimer !== null) { clearInterval(musicFadeTimer); musicFadeTimer = null; }
            }
        }


        function resumeMusicAtBeauty() {
            if (musicAllowedPastGate) return;

            if (!musicGateClosed || tinySoundtrack.currentTime < MUSIC_HOLD_TIME - .16) return;
            musicAllowedPastGate = true;
            musicGateClosed = false;
            if (musicFadeTimer !== null) { clearInterval(musicFadeTimer); musicFadeTimer = null; }
            musicSeekingResume = false;

            startMusicIfAllowed();

            if (tinySoundtrack.volume < MUSIC_VOLUME - .01) fadeMusicVolumeTo(MUSIC_VOLUME, 420);
        }

        function cueIndexAt(t) {
            let lo = 0, hi = lyricCues.length - 1, result = -1;
            while (lo <= hi) {
                const mid = (lo + hi) >> 1;
                if (lyricCues[mid].time <= t + .035) { result = mid; lo = mid + 1; }
                else hi = mid - 1;
            }
            return result;
        }

        
        function syncLyricWithMusic(force=false) {
            if (activeWish !== 'smile') return;
            const index = cueIndexAt(tinySoundtrack.currentTime || 0);
            if (index === lyricActiveIndex && !force) return;
            if (index < 0) {
                lyricSlots.forEach(el => el.classList.remove('show'));
                lyricActiveIndex = -1;
                return;
            }
            const oldSlot = lyricSlotIndex;
            const nextSlot = oldSlot < 0 ? 0 : 1 - oldSlot;
            const cue = lyricCues[index];
            
            lyricSlots.forEach(el => el.classList.remove('show'));
            const el = lyricSlots[nextSlot];
            el.textContent = cue.text;
            el.classList.toggle('compact', cue.text.length > 31);
            
            requestAnimationFrame(() => {
                if (activeWish === 'smile' && cueIndexAt(tinySoundtrack.currentTime || 0) === index)
                    el.classList.add('show');
            });
            lyricActiveIndex = index;
            lyricSlotIndex = nextSlot;
        }

        let lyricSyncRAF = null;
        function stopLyricSync() {
            if (lyricSyncRAF !== null) { cancelAnimationFrame(lyricSyncRAF); lyricSyncRAF = null; }
        }
        function lyricSyncLoop() {
            if (activeWish !== 'smile') { lyricSyncRAF = null; return; }
            syncLyricWithMusic();
            lyricSyncRAF = requestAnimationFrame(lyricSyncLoop);
        }
        function beginLyricsAtSmile() {
            lyricActiveIndex = -1;
            lyricSlotIndex = -1;
            lyricSlots.forEach(el => { el.classList.remove('show','compact'); el.textContent = ''; });
            lyricZone.classList.add('hien-thi');
            lyricZone.setAttribute('aria-hidden','false');
            syncLyricWithMusic(true);

            stopLyricSync();
            lyricSyncRAF = requestAnimationFrame(lyricSyncLoop);
        }

        tinySoundtrack.addEventListener('timeupdate', () => {
            musicFadeAndHold();
            if (activeWish === 'smile') syncLyricWithMusic();
        });
        tinySoundtrack.addEventListener('play', () => {
            if (!musicAllowedPastGate && !musicGateClosed && musicFadeTimer === null)
                musicFadeTimer = setInterval(musicFadeAndHold, 35);
        });
        
        
        
        startMusicIfAllowed();
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', startMusicIfAllowed, {once:true});
        }
        window.addEventListener('load', startMusicIfAllowed, {once:true});
        window.addEventListener('pageshow', startMusicIfAllowed);
        tinySoundtrack.addEventListener('canplay', startMusicIfAllowed, {once:true});
        tinySoundtrack.addEventListener('canplaythrough', startMusicIfAllowed, {once:true});
        
        
        
        document.addEventListener('pointerdown', startMusicIfAllowed, {passive:true});
        if (!('PointerEvent' in window)) {
            document.addEventListener('touchstart', startMusicIfAllowed, {passive:true});
            document.addEventListener('mousedown', startMusicIfAllowed, {passive:true});
        }
        document.addEventListener('keydown', startMusicIfAllowed);
        window.addEventListener('focus', startMusicIfAllowed);
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) startMusicIfAllowed();
        });

        let clickCount = 0;
        let animationStarted = false;
        
        
        const introNudge = document.getElementById('tiny-intro-nudge');
        let introNudgeTimer = null;
        function hideIntroNudge() {
            clearTimeout(introNudgeTimer);
            introNudgeTimer = null;
            introNudge?.classList.remove('show');
            khungMat.classList.remove('tiny-intro-urging');
        }
        function scheduleIntroNudge(waitMs=2000) {
            clearTimeout(introNudgeTimer);
            if (!musicGateClosed || musicAllowedPastGate || clickCount > 2) return;
            introNudgeTimer = setTimeout(() => {
                if (!musicGateClosed || musicAllowedPastGate || clickCount > 2 || document.hidden) return;
                
                matElements.forEach(eye => eye.classList.add('thuc'));
                khungMat.classList.add('tiny-intro-urging');
                introNudge?.classList.add('show');
            },waitMs);
        }
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) hideIntroNudge();
            else if (musicGateClosed && !musicAllowedPastGate && clickCount <= 2)
                scheduleIntroNudge(2000);
        });

        let canClick = true;
        let dungRoiHoa = false;
        let dungVeLaVang = false;
        let dungVeHoaHong = false; 
        let ngungChopTuDong = false;
        let canhMuonDaChay = false;
        let canhChucDaChay = false;
        let activeWish = '';
        let wishBlinkHandle = null;
        let wishBlinkToken = 0;
        
        let tinyTransitionTimer = 0;
        function budgetSceneTransition(ms=760) {
            clearTimeout(tinyTransitionTimer);
            document.documentElement.classList.add('tiny-scene-transition');
            tinyTransitionTimer=setTimeout(()=>document.documentElement.classList.remove('tiny-scene-transition'),ms);
            window.tinyPauseDecorForTransition=budgetSceneTransition;
        }
        function afterPaintIfCurrent(scene,fn,delay=90) {
            setTimeout(()=>{
                if(activeWish!==scene)return;
                requestAnimationFrame(()=>{if(activeWish===scene)fn()});
            },delay);
        }


        
        function chuyenCanh() {
            {
                if (!canClick) return;
                
                startMusicIfAllowed();
                
                if (clickCount === 2 && (!musicGateClosed || tinySoundtrack.currentTime < MUSIC_HOLD_TIME - .045)) {
                    showMusicWaitHint();
                    return;
                }
                if (clickCount === 2) resumeMusicAtBeauty();
                hideIntroNudge();

                if (clickCount === 0) {
                    canClick = false;
                    clickCount++;
                    text1.classList.remove('hien-thi');
                    
                    setTimeout(() => {
                        matElements.forEach(m => m.classList.add('thuc'));
                        text2.classList.add('hien-thi'); 
                        setTimeout(kichHoatChuKyChop, 1000);
                        canClick = true;
                        if (musicGateClosed && clickCount === 1) scheduleIntroNudge(2000); 
                    }, 700);
                } 
                else if (clickCount === 1) {
                    clickCount++;
                    text2.classList.remove('hien-thi');
                    text3.classList.add('hien-thi');
                    batDauLiec();
                    if (musicGateClosed && !musicAllowedPastGate) scheduleIntroNudge(2000);
                }
                else if (clickCount === 2) {
                    clickCount++;
                    
                    text3.classList.remove('hien-thi');
                    text4.classList.add('hien-thi');
                    pinkOverlay.classList.add('hien-thi');
                    natureCanvas.classList.add('hien-thi');

                    dungLiec(false);


                    trucXElements.forEach(tx => {
                        const currentTransform = window.getComputedStyle(tx).getPropertyValue('transform');
                        tx.style.transition = 'none';
                        tx.style.transform = currentTransform;
                    });
                    requestAnimationFrame(() => requestAnimationFrame(() => {
                        trucXElements.forEach(tx => {
                            tx.style.transition = 'transform 1.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
                            tx.style.transform = 'translateX(0)';
                        });
                    }));

                    khungMat.classList.add('me-man');

                    if (!animationStarted) {
                        animationStarted = true;
                        const chayMuaHoa = () => {
                            try {
                                khoiDongMuaHoa();
                            } catch (err) {
                                console.error("Lỗi:", err);
                            }
                        };
                        if (TINY_PERF.mobile) setTimeout(chayMuaHoa, 900);
                        else requestAnimationFrame(() => requestAnimationFrame(chayMuaHoa));
                    }
                }
                else if (clickCount === 3) {
                    clickCount++;
                    
                    text4.classList.remove('hien-thi');
                    text5.classList.add('hien-thi');
                    document.getElementById('tiny-sky').classList.add('hien-thi');
                    
                    pinkOverlay.classList.remove('hien-thi');
                    vangOverlay.classList.add('loe');          
                    anhHaiNguoi.classList.add('hien-thi');     
                    laCanvas.classList.add('hien-thi');        
                    coHoa.classList.add('hien-thi');           
                    if (!laDaChay) { laDaChay = true; requestAnimationFrame(() => requestAnimationFrame(khoiDongLaVang)); }
                    moiRobot.classList.remove('hien-thi');
                    moiRobot.style.opacity = '0';
                    
                    trucXElements.forEach(tx => {
                        tx.style.transition = ''; 
                        tx.style.transform = ''; 
                    });
                    batDauLiec();   

                    dungRoiHoa = true; 
                    natureCanvas.style.transition = 'opacity 6s ease-in-out';
                    natureCanvas.style.opacity = '0';
                    
                    setTimeout(() => { dungVeHoaHong = true; }, 6300);
                }
                else if (clickCount === 4) {
                    clickCount++;
                    batDauCanhMuon();
                }
                else if (clickCount === 5) {
                    clickCount++;
                    batDauCanhChucSucKhoe();
                }
                else if (clickCount === 6) {
                    clickCount++;
                    batDauCanhChucXinhDep();
                }
                else if (clickCount === 7) {
                    clickCount++;
                    batDauCanhGiuNuCuoi();
                }
                else if (clickCount === 8) {
                    clickCount++;
                    batDauCanhCoBonLa();
                }
                else if (clickCount === 9) {
                    clickCount++;
                    batDauCanhCamLayDi();
                }
                else if (clickCount === 10) {
                    clickCount++;
                    batDauCanhMayMan();
                }
                else if (clickCount === 11) {
                    clickCount++;
                    batDauCanhNhoBe();
                }
                else if (clickCount === 12) {
                    clickCount++;
                    batDauCanhDiuDang();
                }
                else if (clickCount === 13) {
                    clickCount++;
                    batDauCanhHanhTrinh();
                }
                else if (clickCount === 14) {
                    clickCount++;
                    batDauCanhLieuCoThe();
                }
                else if (clickCount === 15) {
                    clickCount++;
                    startShareFlightScene();
                }
            }
        }

        function batDauCanhMuon() {
            if (canhMuonDaChay) return;
            canhMuonDaChay = true;
            canClick = false; 
            ngungChopTuDong = true;
            dungLiec(false);
            matElements.forEach(m => m.classList.remove('nham'));
            text5.classList.remove('hien-thi');

            pinkOverlay.classList.remove('hien-thi');

            
            vangOverlay.classList.remove('loe');
            vangOverlay.style.opacity = '1';
            vangOverlay.style.transition = 'none';
            void vangOverlay.offsetWidth;
            vangOverlay.style.transition = 'opacity 1.7s ease-in-out';
            vangOverlay.style.opacity = '0';
            xanhOverlay.classList.add('hien-thi');
            setTimeout(() => xanhOverlay.classList.remove('hien-thi'), 1100);

            
            anhHaiNguoi.style.transition = 'opacity 1.55s ease-in-out, transform 1.55s ease-out';
            anhHaiNguoi.style.opacity = '0';
            anhHaiNguoi.style.transform = 'translateY(36px)';
            coHoa.style.transition = 'opacity 1.55s ease-in-out';
            coHoa.style.opacity = '0';
            laCanvas.style.transition = 'opacity 1.55s ease-in-out';
            laCanvas.style.opacity = '0';
            setTimeout(() => { dungVeLaVang = true; }, 1750);
            natureCanvas.style.transition = 'opacity 1.5s ease-in-out';
            natureCanvas.style.opacity = '0';
            
            moiRobot.classList.remove('hien-thi');
            moiRobot.style.opacity = '0';
            document.querySelectorAll('.ma-hong').forEach(el => {
                el.style.transition = 'opacity .55s ease-in-out';
                el.style.opacity = '0';
            });

            
            setTimeout(() => {
                khungMat.classList.remove('me-man');
                batDauNhamMat();   
                trucXElements.forEach((tx, index) => {
                    tx.style.transition = index === 0
                        ? 'transform .42s cubic-bezier(0.22, 1, 0.36, 1)'
                        : 'transform 1.12s cubic-bezier(0.22, 1, 0.36, 1)';
                    if (window.innerWidth <= 600) {
                        tx.style.transform = index === 0 ? 'translate(-1px, 3px)' : 'translate(-36px, 6px)';
                    } else {
                        tx.style.transform = index === 0 ? 'translate(-3px, 5px)' : 'translate(-60px, 9px)';
                    }
                });
                moiRobot.style.opacity = '0';
                khungMat.classList.add('canh-muon');
            }, 120);

            setTimeout(() => lowerStars.classList.add('hien-thi'), 620);
            setTimeout(() => {
                text6.classList.add('hien-thi');
                canClick = true;
            }, 1280);
        }

        function batDauCanhChucSucKhoe() {
            if (canhChucDaChay) return;
            canhChucDaChay = true;
            canClick = false;

            text6.classList.remove('hien-thi');
            text7.classList.add('hien-thi');
            womanScene.classList.add('hien-thi');
            
            document.getElementById('tiny-sky').classList.remove('hien-thi');
            lowerStars.classList.remove('hien-thi');
            saoVuTru.classList.remove('hien-thi');
            vienVuTru.classList.remove('hien-thi');
            uiverseStarfield.classList.add('hien-thi');

            khungMat.classList.remove('canh-muon');
            khungMat.classList.add('canh-chuc');

            const traiMat = trucXElements[0].querySelector('.con-mat');
            const phaiMat = trucXElements[1].querySelector('.con-mat');
            const traiCong = trucXElements[0].querySelector('.mat-cong');
            const phaiCong = trucXElements[1].querySelector('.mat-cong');

            traiCong.classList.add('hien');
            phaiCong.classList.remove('hien');
            phaiCong.style.opacity = '0';
            traiMat.classList.remove('thuc');
            traiMat.style.visibility = 'hidden';

            phaiMat.style.visibility = 'visible';
            phaiMat.classList.remove('nham');
            phaiMat.classList.remove('thuc');
            phaiMat.style.animation = 'none';
            phaiMat.style.transform = 'scaleY(.05)';
            void phaiMat.offsetWidth;
            phaiMat.style.animation = 'moMatVuong .64s cubic-bezier(.22,1,.36,1) forwards';

            if (window.innerWidth <= 600) {
                trucXElements[0].style.transform = 'translate(4px, 2px)';
                trucXElements[1].style.transform = 'translate(-14px, 2px)';
            } else {
                trucXElements[0].style.transform = 'translate(7px, 4px)';
                trucXElements[1].style.transform = 'translate(-26px, 3px)';
            }
            
            activeWish = 'health';
            setTimeout(() => {
                if (activeWish !== 'health') return;
                phaiMat.style.animation = 'none';
                phaiMat.style.transform = 'scaleY(1)';
                canClick = true;
                henChopMat();
            }, 990);
        }

        
        function henChopMat() {
            const token = ++wishBlinkToken;
            clearTimeout(wishBlinkHandle);
            function step() {
                if (token !== wishBlinkToken || !['health','beauty','smile','clover','luck'].includes(activeWish)) return;
                const giftOpen = activeWish === 'clover' && khungMat.classList.contains('gift-centered');
                const originalStyle = activeWish === 'luck' || giftOpen;
                const list = activeWish === 'health' || giftOpen
                    ? [matElements[1]]
                    : [...matElements];
                if (originalStyle) {
                    
                    
                    list.forEach(eye => {
                        eye.classList.remove('wish-blink');
                        eye.style.animation = 'none';
                        eye.style.transform = '';
                        eye.style.transition = 'transform .10s ease-in-out';
                        eye.classList.add('nham');
                    });
                    setTimeout(() => {
                        if (token !== wishBlinkToken) return;
                        list.forEach(eye => {
                            eye.classList.remove('nham');
                            eye.style.transition = 'transform .22s ease-out';
                        });
                    }, 150);
                    setTimeout(() => {
                        if (token !== wishBlinkToken) return;
                        list.forEach(eye => eye.style.transition = '');
                    }, 420);
                } else {
                    list.forEach(eye => eye.classList.add('wish-blink'));
                    setTimeout(() => list.forEach(eye => eye.classList.remove('wish-blink')), 420);
                }
                wishBlinkHandle = setTimeout(step, 2400 + Math.random() * 2550);
            }
            wishBlinkHandle = setTimeout(step, 1650 + Math.random() * 900);
        }

        function ngatChopMat() {
            clearTimeout(wishBlinkHandle);
            wishBlinkToken++;
            matElements.forEach(eye => eye.classList.remove('wish-blink','wish-wink','nham'));
        }

        function traMatTinyVeChinhGiua() {
            khungMat.classList.remove('canh-chuc', 'canh-muon', 'me-man', 'wish-smile');
            khungMat.classList.add('wish-beauty');
            
            trucXElements.forEach((tx, index) => {
                tx.style.transition = 'transform 1.05s cubic-bezier(.22,1,.36,1)';
                tx.style.transform = 'translate(0px,0px)';
                const arc = tx.querySelector('.mat-cong');
                arc.classList.remove('hien');
                arc.style.opacity = '0';
                const eye = tx.querySelector('.con-mat');
                eye.classList.remove('nham');
                eye.classList.add('thuc');
                eye.style.animation = 'none';
                eye.style.visibility = 'visible';
                eye.style.opacity = '1';
                eye.style.transform = 'scaleY(.055)';
                eye.style.transition = 'transform ' + (index === 0 ? '.62s' : '.73s') + ' cubic-bezier(.2,1,.3,1)';
            });
            if (nhamMat) nhamMat.forEach(m => m.svg.style.opacity = '0');
            
            requestAnimationFrame(() => requestAnimationFrame(() => {
                matElements.forEach(eye => eye.style.transform = 'scaleY(1)');
            }));
        }

        function batDauCanhChucXinhDep() {
            budgetSceneTransition(820);
            canClick = false;
            ngatChopMat();
            activeWish = 'beauty';
            text7.classList.remove('hien-thi');
            womanScene.classList.remove('hien-thi');
            saoVuTru.classList.remove('hien-thi');
            vienVuTru.classList.remove('hien-thi');
            
            uiverseStarfield.classList.add('hien-thi');
            lowerStars.classList.remove('hien-thi');
            wishBackdrop.className = 'beauty';
            if (TINY_PERF.mobile) afterPaintIfCurrent('beauty',()=>beautyStage.classList.add('hien-thi'),120);
            else beautyStage.classList.add('hien-thi');
            smileStage.classList.remove('hien-thi');
            cloverStage.classList.remove('hien-thi');
            traMatTinyVeChinhGiua();
            setTimeout(() => text8.classList.add('hien-thi'), 320);
            setTimeout(() => {
                if (activeWish !== 'beauty') return;
                canClick = true;
                henChopMat();
            }, 1250);
        }

        
        
        const tinyReferenceWink = (() => {
            const SVGNS = 'http://www.w3.org/2000/svg';
            const BAR = 9, GOC_NHAY = 24, GOC_BEN_KIA = 9, CONG_BIEN = 36;
            const PHASES = [
                {duration:170, from:0, to:1},
                {duration:360, from:1, to:1},
                {duration:230, from:1, to:0}
            ];
            const TOTAL = PHASES.reduce((acc, p) => acc + p.duration, 0);
            const lerp = (a,b,t) => a + (b-a)*t;
            const ease = t => t*t*(3-2*t);
            const rgb = (a,b,t) => 'rgb(' + [0,1,2].map(i => Math.round(lerp(a[i],b[i],t))).join(',') + ')';
            let running = false;
            let token = 0;
            let refs = null;
            let mobileQuestionAnimations = [];

            function contour(top, bottom, radius) {
                const pts = [];
                function segment(x0,y0,x1,y1) {
                    const n = Math.max(1, Math.ceil(Math.hypot(x1-x0,y1-y0)/25));
                    for (let i=0;i<n;i++) pts.push([lerp(x0,x1,i/n),lerp(y0,y1,i/n)]);
                }
                function arc(cx,cy,angle) {
                    for (let i=0;i<=8;i++) {
                        const a=(angle+90*i/8)*Math.PI/180;
                        pts.push([cx+radius*Math.cos(a),cy+radius*Math.sin(a)]);
                    }
                }
                segment(radius,top,160-radius,top); arc(160-radius,top+radius,-90);
                segment(160,top+radius,160,bottom-radius); arc(160-radius,bottom-radius,0);
                segment(160-radius,bottom,radius,bottom); arc(radius,bottom-radius,90);
                segment(0,bottom-radius,0,top+radius); arc(radius,top+radius,180);
                return pts;
            }
            function makeSvg(host,id) {
                const svg=document.createElementNS(SVGNS,'svg');
                svg.classList.add('reference-wink-svg');
                svg.setAttribute('viewBox','0 0 160 160');
                svg.setAttribute('aria-hidden','true');
                svg.innerHTML='<defs><radialGradient id="ref-wink-'+id+'" cx="0.5" cy="0.5" r="0.72">'+
                    '<stop offset="0" stop-color="#ff9ccb"/><stop offset="0.5" stop-color="#ff9ccb"/>'+
                    '<stop offset="1" stop-color="#fbc4df"/></radialGradient></defs>'+
                    '<path fill="url(#ref-wink-'+id+')"/>';
                host.appendChild(svg);
                return {svg,path:svg.querySelector('path'), stops:svg.querySelectorAll('stop'),host};
            }
            function ensure() {
                if (!refs) refs=[makeSvg(trucXElements[0],'left'),makeSvg(trucXElements[1],'right')];
                return refs;
            }
            function draw(m,close,angle) {
                const h=lerp(160,BAR,close), top=160-h, r=Math.min(40,h/2),bottom=top+h;
                const t=Math.max(0,Math.min(1,(close-.3)/.7)),bend=t*t*(3-2*t);
                const points=contour(top,bottom,r);
                const d=points.map(([x,y],i) => (i?'L ':'M ')+x.toFixed(2)+' '+
                    (y-CONG_BIEN*bend*Math.pow(x/160,2)).toFixed(2)).join(' ');
                m.path.setAttribute('d',d+' Z');
                const lo=rgb([255,156,203],[255,183,217],close);
                const rim=rgb([251,196,223],[253,216,234],close);
                m.stops[0].setAttribute('stop-color',lo);
                m.stops[1].setAttribute('stop-color',lo);
                m.stops[2].setAttribute('stop-color',rim);
                m.svg.style.transform='rotate('+angle.toFixed(2)+'deg)';
                
                if(!m.svg.style.filter) m.svg.style.filter='drop-shadow(0 0 13px rgba(243,68,154,.90)) drop-shadow(0 0 20px rgba(246,107,191,.50))';
            }
             const HEART_SVG='<svg viewBox="-50 -50 100 100" width="46" height="46">'+
                 '<path d="M 0 42 C -9 33 -46 9 -46 -17 C -46 -44 -13 -49 0 -27 C 13 -49 46 -44 46 -17 C 46 9 9 33 0 42 Z"'+
                 ' fill="#ff6fae" stroke="#ffe3f0" stroke-width="4" stroke-linejoin="round"/></svg>';
            const STAR_SVG='<svg viewBox="-50 -50 100 100" width="46" height="46"><polygon points="0,-46 13,-16 45,-14 20,7 28,40 0,22 -28,40 -20,7 -45,-14 -13,-16" fill="#ffe27a" stroke="#fff7d0" stroke-width="4" stroke-linejoin="round"/></svg>';
            function trail(x,y,sz,duration=650,mode='heart') {
                const dot=document.createElement('div');
                dot.className='reference-wink-trail '+(mode==='star'?'star-mode':'heart-mode');
                const finalSize = mode==='heart' ? sz*1.45 : sz;
                dot.style.width=dot.style.height=finalSize+'px';
                dot.style.transform='translate('+x+'px,'+y+'px)';
                document.body.appendChild(dot);
                const startScale = mode==='heart' ? 1.12 : 1;
                const endScale = mode==='heart' ? .12 : .2;
                const fadeDuration = mode==='heart' ? Math.max(duration, 840) : duration;
                const a=dot.animate([{opacity:1,transform:dot.style.transform+' scale('+startScale+')'},
                    {opacity:0,transform:dot.style.transform+' scale('+endScale+')'}],
                    {duration:fadeDuration,easing:'ease-out',fill:'forwards'});
                a.onfinish=()=>dot.remove();
            }
            function shootProjectile(mode='heart') {
                const r=trucXElements[1].getBoundingClientRect();
                const k=r.width/160,th=GOC_NHAY*Math.PI/180;
                const vx=(140-80)*k,vy=(155-CONG_BIEN*Math.pow(140/160,2)-80)*k;
                const x0=r.left+r.width/2+vx*Math.cos(th)-vy*Math.sin(th);
                const y0=r.top+r.height/2+vx*Math.sin(th)+vy*Math.cos(th);
                const x2=Math.min(innerWidth-40,x0+Math.min(innerWidth*.32,420));
                const y2=Math.max(40,y0-Math.min(innerHeight*.42,320));
                const cx=x0+(x2-x0)*.15,cy=y0-(y0-y2)*1.15;
                const star=document.createElement('div');
                star.className='reference-wink-star '+(mode==='star'?'star-mode':'heart-mode');
                star.innerHTML=(mode==='star'?STAR_SVG:HEART_SVG);
                document.body.appendChild(star);
                const DUR=1900,t0=performance.now();let last=0;
                const base=innerWidth<=600?.8:1;
                function frame(now) {
                    const t=Math.min(1,(now-t0)/DUR),e=1-Math.pow(1-t,2.2),u=1-e;
                    const x=u*u*x0+2*u*e*cx+e*e*x2;
                    const y=u*u*y0+2*u*e*cy+e*e*y2;
                    const sc=(t<.18?lerp(.15,1.25,t/.18):lerp(1.25,.95,(t-.18)/.82))*
                        base*(1+Math.sin(now/90)*.06);
                    star.style.transform='translate('+x.toFixed(1)+'px,'+y.toFixed(1)+'px) rotate('+
                        (e*420).toFixed(1)+'deg) scale('+sc.toFixed(3)+')';
                    star.style.opacity=t<.72?'1':String(Math.max(0,1-(t-.72)/.28));
                    const trailGap = mode==='heart' ? (TINY_PERF.mobile?105:118) : (TINY_PERF.mobile?215:145);
                    if (now-last>trailGap&&t<.9) {
                        last=now;
                        const sz=((mode==='heart'?7:4)+Math.random()*(mode==='heart'?9:7))*base;
                        trail(x-sz/2+(Math.random()-.5)*(mode==='heart'?12:16),y-sz/2+(Math.random()-.5)*(mode==='heart'?12:16),sz,mode==='heart'?900:650,mode);
                    }
                    if(t<1)requestAnimationFrame(frame);else star.remove();
                }
                requestAnimationFrame(frame);
                const glow=document.createElement('div');
                glow.className='reference-wink-trail '+(mode==='star'?'star-mode':'heart-mode');
                glow.style.width=glow.style.height=(mode==='heart'?'110px':'90px');
                glow.style.transform='translate('+(x0-45)+'px,'+(y0-45)+'px)';
                document.body.appendChild(glow);
                const a=glow.animate([{opacity:.9,transform:glow.style.transform+' scale(.3)'},
                    {opacity:0,transform:glow.style.transform+' scale(2.2)'}],
                    {duration:600,easing:'ease-out',fill:'forwards'});
                a.onfinish=()=>glow.remove();
            }
            function clear() {
                ++token;running=false;
                mobileQuestionAnimations.forEach(a=>{try{a.cancel()}catch(_){}});
                mobileQuestionAnimations=[];
                
                const questionArcPath = trucXElements[1].querySelector('.mat-cong path');
                if (questionArcPath) questionArcPath.setAttribute('d','M 18 39 Q 80 59 142 39');
                khungMat.classList.remove('question-wink-tilt');
                if(refs)refs.forEach(m=>m.host.classList.remove('reference-wink-active'));
            }
            function play() {
                if(running||activeWish!=='smile')return;
                const eyes=ensure();
                running=true;
                const current=++token;
                draw(eyes[0],0,0);draw(eyes[1],0,0);
                
                eyes.forEach(m=>m.host.classList.add('reference-wink-active'));
                const t0=performance.now();let fired=false;
                function frame(now) {
                    if(current!==token||activeWish!=='smile')return clear();
                    const elapsed=now-t0;let acc=0,q=0;
                    for(const p of PHASES) {
                        if(elapsed<acc+p.duration) {
                            q=lerp(p.from,p.to,ease((elapsed-acc)/p.duration));break;
                        }
                        acc+=p.duration;q=p.to;
                    }
                    draw(eyes[1],q,GOC_NHAY*q);
                    draw(eyes[0],0,GOC_BEN_KIA*q);
                    if(!fired&&elapsed>=120) {fired=true;shootProjectile('heart');}
                    if(elapsed<TOTAL)requestAnimationFrame(frame);
                    else {
                        draw(eyes[0],0,0);draw(eyes[1],0,0);
                        eyes.forEach(m=>m.host.classList.remove('reference-wink-active'));
                        running=false;
                    }
                }
                requestAnimationFrame(frame);
            }
            
            
            
            
            
            
            async function holdOppositeEye() {
                ++token;
                running = false;
                const current = token;
                const valid = () => current === token && activeWish === 'question';
                const wait = ms => new Promise(resolve => setTimeout(resolve,ms));
                const randomBlinkPause = () => 1500 + Math.random() * 1600; 
                const arcRight = trucXElements[1].querySelector('.mat-cong');
                
                
                const winkCurve = arcRight && arcRight.querySelector('path');
                const originalCurve = winkCurve ? winkCurve.getAttribute('d') : null;
                if (winkCurve) winkCurve.setAttribute('d', 'M 12 43 C 56 60 104 63 148 47');
                const original = matElements;
                const reset = () => {
                    original.forEach(eye => {
                        eye.classList.remove('nham','wish-blink','wish-wink');
                        eye.style.transition = 'none';
                        eye.style.setProperty('transform', 'rotate(0deg) scaleY(1)', 'important');
                        eye.style.setProperty('animation','none','important');
                        eye.style.setProperty('opacity','1','important');
                        eye.style.clipPath = '';
                    });
                    if (arcRight) {
                        arcRight.style.setProperty('opacity','0','important');
                        arcRight.style.setProperty('visibility','visible','important');
                        arcRight.style.setProperty('transform','rotate(0deg)','important');
                        const path=arcRight.querySelector('path');
                        if(path){path.style.removeProperty('opacity');path.style.removeProperty('transform');}
                    }
                };
                
                
                const wink = () => new Promise(resolve => {
                    if (!valid()) return resolve();
                    reset();
                    if (TINY_PERF.mobile && typeof original[1].animate === 'function') {
                        
                        
                        const right=original[1], left=original[0], total=TOTAL;
                        [right,left].filter(Boolean).forEach(el=>{
                            el.style.removeProperty('transform'); el.style.removeProperty('opacity');
                        });
                        const a=PHASES[0].duration/total;
                        const b=(PHASES[0].duration+PHASES[1].duration)/total;
                        const opt={duration:total,easing:'linear',fill:'none'};
                        const rightA=right.animate([
                            {offset:0,transform:'rotate(0deg) scaleY(1)',opacity:1},
                            {offset:a,transform:'rotate(24deg) scaleY(.056)',opacity:0},
                            {offset:b,transform:'rotate(24deg) scaleY(.056)',opacity:0},
                            {offset:1,transform:'rotate(0deg) scaleY(1)',opacity:1}
                        ],opt);
                        const leftA=left.animate([
                            {offset:0,transform:'rotate(0deg)'},
                            {offset:a,transform:'rotate(9deg)'},
                            {offset:b,transform:'rotate(9deg)'},
                            {offset:1,transform:'rotate(0deg)'}
                        ],opt);
                        
                        
                        const arcPath=arcRight?.querySelector('path');
                        if (arcRight) {
                            arcRight.style.setProperty('display','block','important');
                            arcRight.style.setProperty('visibility','visible','important');
                            arcRight.style.setProperty('opacity','0','important');
                            if (arcPath) {
                                arcPath.getAnimations().forEach(a=>a.cancel());
                                arcPath.style.removeProperty('opacity');
                                arcPath.style.removeProperty('transform');
                            }
                        }
                        const showArc=()=>{
                            if (!valid() || !arcRight) return;
                            arcRight.style.setProperty('transform','rotate(24deg)','important');
                            arcRight.style.setProperty('visibility','visible','important');
                            arcRight.style.setProperty('opacity','1','important');
                        };
                        const hideArc=()=>{
                            if (!arcRight) return;
                            arcRight.style.setProperty('opacity','0','important');
                        };
                        
                        
                        const showTimer=setTimeout(showArc,115);
                        const hideTimer=setTimeout(hideArc,655);
                        const starTimer=setTimeout(()=>{if(valid())shootProjectile('star')},120);
                        mobileQuestionAnimations=[rightA,leftA];
                        rightA.onfinish=()=>{
                            clearTimeout(showTimer);clearTimeout(hideTimer);clearTimeout(starTimer);
                            hideArc();
                            rightA.cancel();leftA.cancel();
                            if(valid())reset();
                            resolve();
                        };
                        return;
                    }
                    const t0 = performance.now();
                    let fired = false;
                    const frame = now => {
                        if (!valid()) return resolve();
                        const elapsed = now-t0;
                        let accumulated=0, q=0;
                        for(const phase of PHASES) {
                            if(elapsed < accumulated+phase.duration) {
                                q=lerp(phase.from,phase.to,ease((elapsed-accumulated)/phase.duration));
                                break;
                            }
                            accumulated += phase.duration;
                            q=phase.to;
                        }
                        
                        
                        const right = original[1], left = original[0];
                        right.style.transformOrigin = '50% 50%';
                        left.style.transformOrigin = '50% 50%';
                        right.style.setProperty('transform', 'rotate('+(24*q).toFixed(3)+'deg) scaleY('+(1-.944*q).toFixed(4)+')', 'important');
                        left.style.setProperty('transform', 'rotate('+(9*q).toFixed(3)+'deg) scaleY(1)', 'important');
                        
                        
                        if(arcRight) {
                            const lineOpacity = Math.max(0,Math.min(1,(q-.55)/.30));
                            arcRight.style.setProperty('opacity',String(lineOpacity),'important');
                            arcRight.style.setProperty('visibility','visible','important');
                            arcRight.style.setProperty('transform', 'rotate('+(24*q).toFixed(3)+'deg)', 'important');
                        }
                        right.style.setProperty('opacity',String(1-Math.max(0,(q-.65)/.25)),'important');
                        if(!fired && elapsed>=120) { fired=true; shootProjectile('star'); }
                        if(elapsed<TOTAL)requestAnimationFrame(frame);
                        else {reset();resolve();}
                    };
                    requestAnimationFrame(frame);
                });
                
                const blink = async () => {
                    if(!valid())return;
                    reset();
                    original.forEach(eye=>{
                        eye.style.transition='transform .23s ease-in-out';
                        eye.style.setProperty('transform','rotate(0deg) scaleY(.05)','important');
                    });
                    await wait(290);
                    if(!valid())return;
                    original.forEach(eye=>{
                        eye.style.transition='transform .30s ease-out';
                        eye.style.setProperty('transform','rotate(0deg) scaleY(1)','important');
                    });
                    await wait(340);
                    if(valid()) reset();
                };
                
                if(refs)refs.forEach(m=>m.host.classList.remove('reference-wink-active'));
                reset();
                await wink();
                if(!valid())return;
                await wait(550);
                for(let i=0;i<3;i++) {
                    await blink();
                    if(!valid())return;
                    await wait(i===2?1000:randomBlinkPause());
                }
                await wink();
                if(valid())reset();
                if (winkCurve && originalCurve !== null) winkCurve.setAttribute('d', originalCurve);
            }
            return {play,clear,holdOppositeEye};
        })();

        function batDauCanhGiuNuCuoi() {
            budgetSceneTransition(850);
            canClick = false;
            ngatChopMat();
            activeWish = 'smile';
            beginLyricsAtSmile();
            text8.classList.remove('hien-thi');
            beautyStage.classList.remove('hien-thi');
            cloverStage.classList.remove('hien-thi');
            
            
            
            const waguriSmile = document.getElementById('waguri-smile-video');
            const waguriRevealId = ++window.tinyWaguriRevealId || (window.tinyWaguriRevealId = 1);
            smileStage.classList.remove('waguri-frame-visible');
            if (TINY_PERF.mobile) smileStage.classList.add('hien-thi');
            else smileStage.classList.add('hien-thi');
            if (waguriSmile) {
                waguriSmile.muted = true;
                waguriSmile.loop = true;
                const revealOnce = (() => {
                    let shown = false;
                    return () => {
                        if (shown || activeWish !== 'smile' || window.tinyWaguriRevealId !== waguriRevealId) return;
                        shown = true;
                        requestAnimationFrame(() => requestAnimationFrame(() => {
                            if (activeWish === 'smile' && window.tinyWaguriRevealId === waguriRevealId)
                                smileStage.classList.add('waguri-frame-visible');
                        }));
                    };
                })();
                const playWaguri = () => {
                    if (activeWish !== 'smile' || window.tinyWaguriRevealId !== waguriRevealId) return;
                    
                    if (typeof waguriSmile.requestVideoFrameCallback === 'function') {
                        try { waguriSmile.requestVideoFrameCallback(revealOnce); } catch (_) {}
                    } else {
                        
                        const onTimeUpdate = () => {
                            if (waguriSmile.readyState >= 2 && waguriSmile.currentTime > 0) {
                                waguriSmile.removeEventListener('timeupdate',onTimeUpdate);
                                revealOnce();
                            }
                        };
                        waguriSmile.addEventListener('timeupdate',onTimeUpdate);
                        waguriSmile.addEventListener('playing',() => {
                            if (waguriSmile.readyState >= 2) requestAnimationFrame(revealOnce);
                        },{once:true});
                    }
                    
                    waguriSmile.play().catch(() => {});
                };
                if (TINY_PERF.mobile) afterPaintIfCurrent('smile',playWaguri,65);
                else playWaguri();
            }
            wishBackdrop.className = 'smile';
            khungMat.classList.remove('wish-beauty');
            khungMat.classList.add('wish-smile');
            tinyReferenceWink.clear();
            if (window.innerWidth <= 700 && window.matchMedia('(orientation: portrait)').matches) {
                trucXElements[0].style.transform = 'translate(4px, 8px)';
                trucXElements[1].style.transform = 'translate(-2px, 12px)';
            } else {
                trucXElements[0].style.transform = 'translate(10px, 10px)';
                trucXElements[1].style.transform = 'translate(-6px, 14px)';
            }
            matElements.forEach(eye => {
                eye.style.visibility = 'visible';
                eye.style.animation = 'none';
                eye.style.transform = 'scaleY(1)';
                eye.classList.remove('wish-blink','wish-wink');
            });
            setTimeout(() => text9.classList.add('hien-thi'), 280);
            setTimeout(() => {
                if (activeWish !== 'smile') return;
                tinyReferenceWink.play();
            }, TINY_PERF.mobile ? 460 : 200);
            setTimeout(() => {
                if (activeWish !== 'smile') return;
                canClick = true;
                henChopMat();
            }, 1100);
        }

        
        
        let cloverParticleTimer = null;
        
        
        let tinyV8CloverParticleOrigin = null;
        addEventListener('resize', () => { tinyV8CloverParticleOrigin = null; }, {passive:true});
        function batDauHatSangCoBonLa() {
            if (cloverParticleTimer !== null) return;
            const bloom = document.getElementById('clover-sample-bloom');
            const field = document.getElementById('clover-particle-field');
            cloverParticleTimer = setInterval(() => {
                if (activeWish !== 'clover' || document.hidden || !bloom || !field) return;
                const origin = TINY_PERF.mobile
                    ? (tinyV8CloverParticleOrigin ||= (()=>{
                          const r=bloom.getBoundingClientRect();
                          const a=field.getBoundingClientRect();
                          return {width:r.width,height:r.height,left:r.left-a.left,top:r.top-a.top};
                      })())
                    : null;
                const r = origin || bloom.getBoundingClientRect();
                const area = origin ? null : field.getBoundingClientRect();
                if (r.width === 0 || r.height === 0) return;
                const dot = document.createElement('div');
                dot.className = 'clover-particle';
                const sz = 3 + Math.random() * 6;
                dot.style.width = dot.style.height = sz + 'px';
                const x = r.left - (area?.left || 0) + r.width / 2 + (Math.random() - .5) * r.width * 1.1;
                const y = r.top - (area?.top || 0) + r.height / 2 + (Math.random() - .5) * r.height * .8;
                dot.style.left = x + 'px';
                dot.style.top = y + 'px';
                field.appendChild(dot);
                const a = dot.animate([
                    {transform:'translate(0px,0px) scale(1)', opacity:.95},
                    {transform:'translate(' + ((Math.random() - .5)*60).toFixed(1) + 'px,-' + (70 + Math.random()*110).toFixed(1) + 'px) scale(.2)', opacity:0}
                ], {duration:1500 + Math.random()*1400,easing:'ease-out'});
                a.onfinish = () => dot.remove();
            }, TINY_PERF.mobile ? 590 : TINY_PERF.lite ? 155 : 115);
        }
        let cloverFireflyBurst = false;
        function xoaDomDomCoBonLa() {
            const field = document.getElementById('clover-particle-field');
            if (!field) return;
            field.querySelectorAll('.clover-firefly').forEach(el => el.remove());
            field.dataset.firefliesReady = '0';
            cloverFireflyBurst = false;
        }

        function taoDomDomCoBonLa() {
            const field = document.getElementById('clover-particle-field');
            if (!field || field.dataset.firefliesReady === '1') return;
            field.dataset.firefliesReady = '1';
            cloverFireflyBurst = true;
            const total = TINY_PERF.mobile ? 5 : (window.innerWidth <= 700 ? 16 : 24);
            for (let i = 0; i < total; i++) {
                const dot = document.createElement('div');
                dot.className = 'clover-firefly';
                const size = (window.innerWidth <= 700 ? 5.5 : 6.5) + Math.random() * (window.innerWidth <= 700 ? 5.5 : 6.5);
                dot.style.width = dot.style.height = size + 'px';
                const left = window.innerWidth <= 700 ? (8 + Math.random() * 84) : (18 + Math.random() * 72);
                const top = window.innerWidth <= 700 ? (16 + Math.random() * 66) : (16 + Math.random() * 64);
                dot.style.left = left + '%';
                dot.style.top = top + '%';
                dot.style.setProperty('--dx', ((Math.random() - 0.5) * (window.innerWidth <= 700 ? 18 : 28)).toFixed(1) + 'px');
                dot.style.setProperty('--dy', (-(10 + Math.random() * (window.innerWidth <= 700 ? 22 : 34))).toFixed(1) + 'px');
                dot.style.setProperty('--fly-dur', (4300 + Math.random() * 2600).toFixed(0) + 'ms');
                dot.style.setProperty('--fly-delay', (-Math.random() * 2800).toFixed(0) + 'ms');
                dot.style.setProperty('--blink-dur', (1600 + Math.random() * 1800).toFixed(0) + 'ms');
                dot.style.setProperty('--blink-delay', (-Math.random() * 1600).toFixed(0) + 'ms');
                field.appendChild(dot);
            }
        }

        
        
        
        const cloverXEyes = (() => {
            const NS = 'http://www.w3.org/2000/svg';
            const BOX = 160, R0 = 40, T = 22, W_NHAM = 150;
            const L0 = W_NHAM - T, L_F = 104, TH_F = 38 * Math.PI / 180;
            const S_END = T / BOX;
            let shapes = null, run = 0, startGap = 120;
            const lerp = (a,b,t) => a + (b-a)*t;

            
            function cubicBezier(x1,y1,x2,y2) {
                const cx=3*x1,bx=3*(x2-x1)-cx,ax=1-cx-bx;
                const cy=3*y1,by=3*(y2-y1)-cy,ay=1-cy-by;
                const X=t=>((ax*t+bx)*t+cx)*t;
                const Y=t=>((ay*t+by)*t+cy)*t;
                const dX=t=>(3*ax*t+2*bx)*t+cx;
                return x=>{
                    if(x<=0)return 0;
                    if(x>=1)return 1;
                    let t=x;
                    for(let i=0;i<8;i++){
                        const e=X(t)-x;
                        if(Math.abs(e)<1e-5)return Y(t);
                        const d=dX(t);
                        if(Math.abs(d)<1e-6)break;
                        t-=e/d;
                    }
                    let lo=0,hi=1;t=x;
                    for(let i=0;i<24;i++){
                        if(X(t)<x)lo=t;else hi=t;
                        t=(lo+hi)/2;
                    }
                    return Y(t);
                };
            }
            const EASE_NHAM=cubicBezier(.45,0,.30,1);
            const EASE_OUT=cubicBezier(.2,.8,.2,1);
            const EASE_GOC=cubicBezier(.55,0,.25,1.28);
            const EASE_DAI=cubicBezier(.4,0,.2,1);

            function setRect(rect,x,y,w,h,rx,ry,rot,px,py) {
                rect.setAttribute('x',x.toFixed(2));
                rect.setAttribute('y',y.toFixed(2));
                rect.setAttribute('width',Math.max(0,w).toFixed(2));
                rect.setAttribute('height',Math.max(0,h).toFixed(2));
                rect.setAttribute('rx',rx.toFixed(2));
                rect.setAttribute('ry',ry.toFixed(2));
                if(rot)rect.setAttribute('transform',`rotate(${rot.toFixed(3)} ${px.toFixed(2)} ${py.toFixed(2)})`);
                else rect.removeAttribute('transform');
            }
            function ensure() {
                if(shapes)return shapes;
                shapes=[...trucXElements].map((host,index)=>{
                    const svg=document.createElementNS(NS,'svg');
                    svg.classList.add('clover-x-svg');
                    if(index===1)svg.classList.add('clover-x-mirror');
                    svg.setAttribute('viewBox','0 0 160 160');
                    svg.setAttribute('aria-hidden','true');
                    const gradId='cloverXGradient'+index;
                    svg.innerHTML=`<defs><radialGradient id="${gradId}" cx=".5" cy=".5" r=".72"><stop offset="0" stop-color="#ff9ccb"/><stop offset=".5" stop-color="#ff9ccb"/><stop offset="1" stop-color="#fbc4df"/></radialGradient></defs><rect class="clover-x-upper" fill="url(#${gradId})"/><rect class="clover-x-lower" fill="url(#${gradId})"/>`;
                    svg.style.visibility='hidden';
                    host.appendChild(svg);
                    return {host,svg,upper:svg.querySelector('.clover-x-upper'),lower:svg.querySelector('.clover-x-lower')};
                });
                return shapes;
            }
            function draw(s,p,c) {
                const items=ensure();
                if(c>0) {
                    const theta=TH_F*EASE_GOC(c);
                    const L=lerp(L0,L_F,EASE_DAI(c));
                    const Vx=BOX/2 + L*Math.cos(theta)/2;
                    const x=Vx-L-T/2,y=BOX/2-T/2,w=L+T,h=T;
                    const angle=theta*180/Math.PI;
                    items.forEach(m=>{
                        setRect(m.upper,x,y,w,h,T/2,T/2,angle,Vx,BOX/2);
                        setRect(m.lower,x,y,w,h,T/2,T/2,-angle,Vx,BOX/2);
                    });
                    if (!TINY_PERF.mobile) khungMat.style.gap=lerp(startGap,startGap*82/120,EASE_DAI(c)).toFixed(2)+'px';
                } else {
                    const h=BOX*s,w=lerp(BOX,W_NHAM,p),x=(BOX-w)/2,y=BOX/2-h/2;
                    const rx=lerp(R0,T/2,p),ry=Math.min(lerp(R0*s,T/2,p),h/2);
                    items.forEach(m=>{
                        setRect(m.upper,x,y,w,h,rx,ry,0,0,0);
                        setRect(m.lower,x,y,w,h,rx,ry,0,0,0);
                    });
                    if (!TINY_PERF.mobile) khungMat.style.gap=startGap+'px';
                }
            }
            function tween(ms,easing,fn,token) {
                return new Promise(resolve=>{
                    const t0=performance.now();
                    function frame(now) {
                        if(token!==run || activeWish!=='clover')return resolve(false);
                        const t=Math.max(0,Math.min(1,(now-t0)/ms));
                        fn(easing(t));
                        if(t<1)requestAnimationFrame(frame);
                        else resolve(true);
                    }
                    requestAnimationFrame(frame);
                });
            }
            async function play() {
                if(activeWish!=='clover')return;
                const token=++run;
                const items=ensure();
                startGap=TINY_PERF.mobile ? 52 : (parseFloat(getComputedStyle(khungMat).gap)||120);
                khungMat.classList.add('clover-x-animating');
                items.forEach(m=>m.svg.classList.remove('clover-x-rest'));
                
                draw(1,0,0);
                items.forEach(m=>{m.svg.style.visibility='visible';m.host.classList.add('clover-x-active');});
                
                
                if(!await tween(850,EASE_NHAM,v=>{
                    const s=lerp(1,S_END,v);
                    const p=Math.min(1,v*1.12);
                    const c=Math.min(1,v*1.28);
                    draw(s,p,c);
                },token))return;
                draw(S_END,1,1);
                items.forEach(m=>m.svg.classList.add('clover-x-rest'));
            }
            function stop() {
                ++run;
                if(shapes)shapes.forEach(m=>{
                    m.host.classList.remove('clover-x-active');
                    m.svg.classList.remove('clover-x-rest');
                    m.svg.style.visibility='hidden';
                });
                khungMat.classList.remove('clover-x-animating');
                khungMat.style.removeProperty('gap');
            }
            return {play,stop};
        })();

        function moMotMatBenCoBonLa() {
            const NS = 'http://www.w3.org/2000/svg';
            const BOX = 160, T = 22, W_NHAM = 150, L0 = W_NHAM - T, L_F = 104, TH_F = 38 * Math.PI / 180;
            const S_END = T / BOX;
            const host = trucXElements[1];
            const eye = matElements[1];
            const xSvg = host.querySelector('.clover-x-svg');
            if (!xSvg) return Promise.resolve();
            const upper = xSvg.querySelector('.clover-x-upper');
            const lower = xSvg.querySelector('.clover-x-lower');
            const lerp = (a,b,t)=>a+(b-a)*t;
            const ease = t => 1 - Math.pow(1 - t, 3);
            function setRect(rect,x,y,w,h,rx,ry,rot,px,py) {
                rect.setAttribute('x',x.toFixed(2));
                rect.setAttribute('y',y.toFixed(2));
                rect.setAttribute('width',Math.max(0,w).toFixed(2));
                rect.setAttribute('height',Math.max(0,h).toFixed(2));
                rect.setAttribute('rx',rx.toFixed(2));
                rect.setAttribute('ry',ry.toFixed(2));
                if (rot) rect.setAttribute('transform',`rotate(${rot.toFixed(3)} ${px.toFixed(2)} ${py.toFixed(2)})`);
                else rect.removeAttribute('transform');
            }
            function drawBars(c) {
                const theta=TH_F*(1-c);
                const L=lerp(L_F,L0,c);
                const Vx=BOX/2 + L*Math.cos(theta)/2;
                const x=Vx-L-T/2, y=BOX/2-T/2, w=L+T, h=T;
                const angle=theta*180/Math.PI;
                setRect(upper,x,y,w,h,T/2,T/2,angle,Vx,BOX/2);
                setRect(lower,x,y,w,h,T/2,T/2,-angle,Vx,BOX/2);
                xSvg.style.opacity = String(1 - c*.96);
            }
            return new Promise(resolve=>{
                host.classList.add('clover-opening-eye');
                eye.style.transition = 'none';
                eye.style.borderRadius = (window.innerWidth <= 700 ? '24px' : '30px');
                eye.style.transform = 'scaleY(' + S_END + ')';
                xSvg.style.visibility = 'visible';
                let start = null;
                const dur = 240;
                function frame(ts) {
                    if (activeWish !== 'clover') return resolve();
                    if (!start) start = ts;
                    const raw = Math.min(1, (ts - start) / dur);
                    const v = ease(raw);
                    drawBars(v);
                    eye.style.transform = 'scaleY(' + lerp(S_END,1,v).toFixed(4) + ')';
                    if (raw < 1) requestAnimationFrame(frame);
                    else {
                        host.classList.remove('clover-x-active','clover-opening-eye');
                        xSvg.style.visibility = 'hidden';
                        xSvg.style.opacity = '1';
                        eye.style.transition = '';
                        eye.style.transform = 'scaleY(1)';
                        resolve();
                    }
                }
                requestAnimationFrame(frame);
            });
        }


        function taoSvgCoBonLaNoi(innerClass='') {
            const isBg = innerClass.indexOf('luck-bg-svg') !== -1;
            if (isBg) {
                return '<svg viewBox="0 0 300 420" aria-hidden="true">' +
                    '<g class="' + innerClass + '">' +
                    '<path d="M150 190 C 188 262, 112 322, 146 372 C 160 392, 150 406, 154 414" pathLength="1" style="fill:none"/>' +
                    '<g transform="translate(150 140) rotate(-8) scale(2.9)">' +
                    '<path transform="rotate(45)" d="M0 0 C -6 -8 -22 -14 -22 -28 C -22 -38 -8 -42 0 -32 C 8 -42 22 -38 22 -28 C 22 -14 6 -8 0 0 Z"/>' +
                    '<path transform="rotate(135)" d="M0 0 C -6 -8 -22 -14 -22 -28 C -22 -38 -8 -42 0 -32 C 8 -42 22 -38 22 -28 C 22 -14 6 -8 0 0 Z"/>' +
                    '<path transform="rotate(225)" d="M0 0 C -6 -8 -22 -14 -22 -28 C -22 -38 -8 -42 0 -32 C 8 -42 22 -38 22 -28 C 22 -14 6 -8 0 0 Z"/>' +
                    '<path transform="rotate(315)" d="M0 0 C -6 -8 -22 -14 -22 -28 C -22 -38 -8 -42 0 -32 C 8 -42 22 -38 22 -28 C 22 -14 6 -8 0 0 Z"/>' +
                    '</g></g></svg>';
            }
            const gid = 'luck-leaf-grad-' + Math.random().toString(36).slice(2, 9);
            return '<svg viewBox="0 0 170 170" aria-hidden="true">' +
                '<defs>' +
                '<radialGradient id="' + gid + '" cx=".5" cy=".42" r=".68">' +
                '<stop offset="0" stop-color="#31d85f"/>' +
                '<stop offset=".62" stop-color="#66f497"/>' +
                '<stop offset="1" stop-color="#c8ffd9"/>' +
                '</radialGradient>' +
                '</defs>' +
                '<g class="' + innerClass + '">' +
                '<g transform="translate(85 85)">' +
                '<path transform="rotate(45) scale(1.25)" d="M0 0 C -6 -8 -22 -14 -22 -28 C -22 -38 -8 -42 0 -32 C 8 -42 22 -38 22 -28 C 22 -14 6 -8 0 0 Z" fill="url(#' + gid + ')" stroke="#d4ffe3" stroke-width="1.3" stroke-linejoin="round"/>' +
                '<path transform="rotate(135) scale(1.25)" d="M0 0 C -6 -8 -22 -14 -22 -28 C -22 -38 -8 -42 0 -32 C 8 -42 22 -38 22 -28 C 22 -14 6 -8 0 0 Z" fill="url(#' + gid + ')" stroke="#d4ffe3" stroke-width="1.3" stroke-linejoin="round"/>' +
                '<path transform="rotate(225) scale(1.25)" d="M0 0 C -6 -8 -22 -14 -22 -28 C -22 -38 -8 -42 0 -32 C 8 -42 22 -38 22 -28 C 22 -14 6 -8 0 0 Z" fill="url(#' + gid + ')" stroke="#d4ffe3" stroke-width="1.3" stroke-linejoin="round"/>' +
                '<path transform="rotate(315) scale(1.25)" d="M0 0 C -6 -8 -22 -14 -22 -28 C -22 -38 -8 -42 0 -32 C 8 -42 22 -38 22 -28 C 22 -14 6 -8 0 0 Z" fill="url(#' + gid + ')" stroke="#d4ffe3" stroke-width="1.3" stroke-linejoin="round"/>' +
                '<path d="M0 0 L0 -38" stroke="rgba(0,95,45,.5)" stroke-width="1.2" stroke-linecap="round" transform="rotate(45) scale(1.25)"/>' +
                '<path d="M0 0 L0 -38" stroke="rgba(0,95,45,.5)" stroke-width="1.2" stroke-linecap="round" transform="rotate(135) scale(1.25)"/>' +
                '<path d="M0 0 L0 -38" stroke="rgba(0,95,45,.5)" stroke-width="1.2" stroke-linecap="round" transform="rotate(225) scale(1.25)"/>' +
                '<path d="M0 0 L0 -38" stroke="rgba(0,95,45,.5)" stroke-width="1.2" stroke-linecap="round" transform="rotate(315) scale(1.25)"/>' +
                '<circle cx="0" cy="0" r="3.4" fill="#eaffd8"/>' +
                '</g></g></svg>';
        }

        let mayManDaTao = false;
        function taoCanhMayManMotLan() {
            if (mayManDaTao) return;
            mayManDaTao = true;
            const bgField = document.getElementById('luck-bg-field');
            if (!bgField) return;
            const div = document.createElement('div');
            div.className = 'luck-bg-clover';
            div.innerHTML = taoSvgCoBonLaNoi('luck-bg-svg');
            bgField.appendChild(div);
        }


        
        
        const luckCanvasLeaves = (() => {
            const R = (a,b) => a + Math.random() * (b-a);
            const clamp = (x,a=0,b=1) => Math.max(a,Math.min(b,x));
            const LA = new Path2D('M0 0 C -6 -8 -22 -14 -22 -28 C -22 -38 -8 -42 0 -32 C 8 -42 22 -38 22 -28 C 22 -14 6 -8 0 0 Z');
function taoSprite(sang, hue) {
    const c = document.createElement('canvas');
    c.width = 170; c.height = 170;
    const x = c.getContext('2d');
    x.translate(85, 85);
    
    const h = x.createRadialGradient(0, 0, 8, 0, 0, 82);
    h.addColorStop(0, 'rgba(116,255,173,' + (.54 * sang).toFixed(2) + ')');
    h.addColorStop(.5, 'rgba(62,242,128,' + (.21 * sang).toFixed(2) + ')');
    h.addColorStop(1, 'rgba(0,0,0,0)');
    x.fillStyle = h; x.fillRect(-85, -85, 170, 170);

    x.lineJoin = 'round'; x.lineCap = 'round';
    const veLa = () => {
        for (const a of [45, 135, 225, 315]) {
            x.save(); x.rotate(a * Math.PI / 180); x.scale(1.25, 1.25);
            
            const g = x.createRadialGradient(0, -6, 2, 0, -6, 46);
            g.addColorStop(0, 'hsl(' + hue + ',88%,48%)');
            g.addColorStop(.6, 'hsl(' + (hue + 4) + ',97%,69%)');
            g.addColorStop(1, 'hsl(' + (hue + 8) + ',100%,86%)');
            x.fillStyle = g;
            x.lineWidth = 1.3;
            x.strokeStyle = '#e2ffea';
            x.fill(LA); x.stroke(LA);
            x.restore();
        }
    };
    
    x.shadowColor = 'rgba(86,255,156,' + (.99 * sang).toFixed(2) + ')'; x.shadowBlur = 24;
    veLa();
    x.shadowBlur = 10; x.shadowColor = 'rgba(150,255,194,' + (.9 * sang).toFixed(2) + ')';
    veLa();
    x.shadowBlur = 0;
    
    x.strokeStyle = 'rgba(0,95,45,.5)'; x.lineWidth = 1.2;
    for (const a of [45, 135, 225, 315]) {
        x.save(); x.rotate(a * Math.PI / 180); x.scale(1.25, 1.25);
        x.beginPath(); x.moveTo(0, -3); x.lineTo(0, -30); x.stroke();
        x.restore();
    }
    x.fillStyle = '#eaffd8'; x.beginPath(); x.arc(0, 0, 3.4, 0, 6.2832); x.fill();
    return c;
}
const SPRITES = [taoSprite(1.02, 140), taoSprite(.96, 136), taoSprite(1.08, 145)];
            let backCanvas, frontCanvas, backCtx, frontCtx;
            let W=0,H=0,S=1,dpr=1, particles=[], raf=0, last=0, started=0, acc=0, ready=false;
            let edgeLaneSeq=0; 
            const isMobile = () => W <= 700;

            function resize() {
                
                const nextW=innerWidth, nextH=innerHeight;
                const nextDpr=TINY_PERF.canvasDpr(nextW,nextH,TINY_PERF.mobile?1.6:1.15);
                if (TINY_PERF.mobile && W>0 && nextW===W && nextH===H && nextDpr===dpr) return;
                W=nextW; H=nextH;
                S=clamp(Math.min(W/900,H/700),.55,1.5); 
                dpr=nextDpr;
                for(const c of [backCanvas,frontCanvas]) {
                    if(!c) continue;
                    c.width=Math.round(W*dpr); c.height=Math.round(H*dpr);
                    c.style.width='100%'; c.style.height='100%';
                }
                if(backCtx) backCtx.setTransform(dpr,0,0,dpr,0,0);
                if(frontCtx) frontCtx.setTransform(dpr,0,0,dpr,0,0);
            }
            function taoHat(preseed=false) {
                const z=R(.45,1.05); 
                const front=z>.82 ? Math.random()<.68 : Math.random()<.15;
                
                const lane=(edgeLaneSeq++ % 6);
                const spawnY = lane===0 ? R(H*.03,H*.17) :
                               lane===3 ? R(H*.82,H*.97) : R(H*.025,H*.975);
                const p={
                    
                    x:preseed?R(-22,W+25):R(-18,12)*S,
                    
                    y:spawnY,
                    z, front,
                    vy:R(9,24)*S, 
                    rot:R(0,6.28), rv:R(-.9,.9),
                    flip:R(0,6.28),fv:R(.8,2.2),
                    sw:R(10,26)*S,sph:R(0,6.28),sf:R(.8,1.6),
                    sp:SPRITES[(Math.random()*SPRITES.length)|0],
                    age:preseed?R(.7,5):0
                };
                particles.push(p);
            }
            function init() {
                const bg=document.getElementById('luck-fall-field');
                const fg=document.getElementById('luck-front-field');
                if(!bg||!fg) return;
                if(!backCanvas) {
                    backCanvas=document.createElement('canvas');
                    backCanvas.className='luck-reference-leaves';
                    backCanvas.setAttribute('aria-hidden','true');
                    backCtx=backCanvas.getContext('2d',{alpha:true});
                }
                if(!frontCanvas) {
                    frontCanvas=document.createElement('canvas');
                    frontCanvas.className='luck-reference-leaves';
                    frontCanvas.setAttribute('aria-hidden','true');
                    frontCtx=frontCanvas.getContext('2d',{alpha:true});
                }
                
                
                if (backCanvas.parentNode !== bg) bg.replaceChildren(backCanvas);
                if (frontCanvas.parentNode !== fg) fg.replaceChildren(frontCanvas);
                resize();
                if(!ready) { addEventListener('resize',resize,{passive:true});ready=true; }
            }
            let prepared = false, frameTimer = 0;
            function schedule() {
                if (raf || frameTimer || document.hidden || activeWish !== 'luck') return;
                const interval=1000/(TINY_PERF.orbitFps || 30);
                const delay=last ? Math.max(0,interval-1000/60-(performance.now()-last)) : 0;
                if (delay>1) {
                    frameTimer=setTimeout(() => {
                        frameTimer=0;
                        if (!document.hidden && activeWish==='luck' && !raf) raf=requestAnimationFrame(draw);
                    },delay);
                } else {
                    raf=requestAnimationFrame(draw);
                }
            }
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    cancelAnimationFrame(raf); raf=0;
                    clearTimeout(frameTimer); frameTimer=0;
                    last=0;
                } else if (activeWish==='luck') schedule();
            });
            function prepare() {
                if (prepared || !TINY_PERF.mobile) return;
                prepared = true;
                init();
            }
            function start() {
                cancelAnimationFrame(raf);
                clearTimeout(frameTimer); frameTimer=0;
                init();
                if(!backCanvas||!frontCanvas)return;
                particles=[];acc=0;last=0;started=0;edgeLaneSeq=0;
                
                const initial=isMobile()?8:13;
                for(let i=0;i<initial;i++) taoHat(true);
                
                
                const edgeBands=[[.045,.16],[.28,.43],[.56,.72],[.86,.965]];
                edgeBands.forEach((band,i)=>{
                    const p=particles[i];
                    if(!p)return;
                    p.x=R(0,Math.min(W*.075,85));
                    p.y=R(H*band[0],H*band[1]);
                    p.age=R(1.35,3.2);
                });
                schedule();
            }
            function draw(now) {
                raf=0;
                if(activeWish!=='luck' || document.hidden) return;
                const interval=1000/(TINY_PERF.orbitFps || 30);
                if (last && now-last < interval) {schedule();return;}
                const dt=last?Math.min(.05,(now-last)/1000):0;
                if(!started) started=now;
                last=now;
                const t=(now-started)/1000;
                backCtx.clearRect(0,0,W,H);frontCtx.clearRect(0,0,W,H);
                const maxItems=isMobile()?13:18;
                const rate=isMobile()?1.35:1.85;
                acc+=dt*rate;
                while(acc>=1) {acc-=1;if(particles.length<maxItems)taoHat();}
                
                const gust=Math.pow(Math.max(0,Math.sin(t*.23)),3)*46;
                const wind=26+20*Math.sin(t*.45)+13*Math.sin(t*1.1+1.3)+gust;
                for(let i=particles.length-1;i>=0;i--) {
                    const p=particles[i];
                    p.age+=dt; p.sph+=p.sf*dt;p.flip+=p.fv*dt;
                    const speed=(W/10.5)*(.65+.6*p.z)+wind*.22*S;
                    p.x+=(speed+Math.sin(p.sph)*p.sw*.55)*dt;
                    p.y+=(p.vy+Math.cos(p.sph*.8)*8*S-Math.max(0,wind-55)*.14*S)*dt;
                    p.rot+=(p.rv+wind*.004)*dt;
                    if(p.x>W+110*S||p.y>H+90*S){particles.splice(i,1);continue;}
                    const entry=clamp(p.age/1.2); 
                    const right=clamp((W+65*S-p.x)/(W*.16+65*S));
                    const alpha=entry*right*(.45+.55*p.z);
                    if(alpha<=.01)continue;
                    const k=p.z*S*.95; 
                    const ctx=p.front?frontCtx:backCtx;
                    ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);
                    ctx.scale(k*(.35+.65*Math.abs(Math.cos(p.flip))),k);
                    ctx.globalAlpha=alpha;
                    ctx.drawImage(p.sp,-85,-85);ctx.restore();
                }
                schedule();
            }
            return {start,prepare,stop:()=>{cancelAnimationFrame(raf);clearTimeout(frameTimer);raf=0;frameTimer=0;last=0;}};
        })();

        function moMatMayManTai(index, dur = 240) {
            const host = trucXElements[index];
            const eye = matElements[index];
            if (!host || !eye) return Promise.resolve();
            const xSvg = host.querySelector('.clover-x-svg');
            if (!xSvg) {
                eye.style.transform = 'scaleY(1)';
                return Promise.resolve();
            }
            const upper = xSvg.querySelector('.clover-x-upper');
            const lower = xSvg.querySelector('.clover-x-lower');
            const BOX = 160, T = 22, W_NHAM = 150, L0 = W_NHAM - T, L_F = 104, TH_F = 38 * Math.PI / 180;
            const S_END = T / BOX;
            const lerp = (a,b,t)=>a+(b-a)*t;
            const ease = t => 1 - Math.pow(1 - t, 3);
            function setRect(rect,x,y,w,h,rx,ry,rot,px,py) {
                rect.setAttribute('x',x.toFixed(2)); rect.setAttribute('y',y.toFixed(2));
                rect.setAttribute('width',Math.max(0,w).toFixed(2)); rect.setAttribute('height',Math.max(0,h).toFixed(2));
                rect.setAttribute('rx',rx.toFixed(2)); rect.setAttribute('ry',ry.toFixed(2));
                if (rot) rect.setAttribute('transform',`rotate(${rot.toFixed(3)} ${px.toFixed(2)} ${py.toFixed(2)})`);
                else rect.removeAttribute('transform');
            }
            function drawBars(c) {
                const theta=TH_F*(1-c), L=lerp(L_F,L0,c), Vx=BOX/2 + L*Math.cos(theta)/2;
                const x=Vx-L-T/2, y=BOX/2-T/2, w=L+T, h=T, angle=theta*180/Math.PI;
                setRect(upper,x,y,w,h,T/2,T/2,angle,Vx,BOX/2);
                setRect(lower,x,y,w,h,T/2,T/2,-angle,Vx,BOX/2);
                xSvg.style.opacity = String(1 - c*.96);
            }
            return new Promise(resolve => {
                host.classList.add('clover-opening-eye');
                eye.style.transition = 'none';
                eye.style.borderRadius = (window.innerWidth <= 700 ? '24px' : '30px');
                eye.style.transform = 'scaleY(' + S_END + ')';
                xSvg.style.visibility = 'visible';
                let start = null;
                function frame(ts) {
                    if (activeWish !== 'luck' && activeWish !== 'clover') return resolve();
                    if (!start) start = ts;
                    const raw = Math.min(1, (ts - start) / dur);
                    const v = ease(raw);
                    drawBars(v);
                    eye.style.transform = 'scaleY(' + lerp(S_END,1,v).toFixed(4) + ')';
                    if (raw < 1) requestAnimationFrame(frame);
                    else {
                        host.classList.remove('clover-x-active','clover-opening-eye');
                        xSvg.style.visibility = 'hidden';
                        xSvg.style.opacity = '1';
                        eye.style.transition = '';
                        eye.style.transform = '';
                        eye.classList.add('thuc');
                        resolve();
                    }
                }
                requestAnimationFrame(frame);
            });
        }

        function batDauCanhMayMan() {
            budgetSceneTransition(920);
            canClick = false;
            ngatChopMat();
            activeWish = 'luck';
            cancelAnimationFrame(cloverGiveRaf);
            if (TINY_PERF.mobile) {
                
                document.documentElement.classList.add('tiny-v6-luck-switch');
                setTimeout(() => {
                    if (activeWish !== 'luck') return;
                    xoaDomDomCoBonLa();
                    
                    if (cloverParticleTimer !== null) {
                        clearInterval(cloverParticleTimer);
                        cloverParticleTimer = null;
                    }
                    const oldField = document.getElementById('clover-particle-field');
                    oldField?.querySelectorAll('.clover-particle').forEach(dot => {
                        dot.getAnimations().forEach(a => a.cancel());
                        dot.remove();
                    });
                }, 360);
                
                afterPaintIfCurrent('luck',taoCanhMayManMotLan,100);
                setTimeout(()=>document.documentElement.classList.remove('tiny-v6-luck-switch'),950);
            } else {
                xoaDomDomCoBonLa();
                taoCanhMayManMotLan();
            }

            document.body.classList.remove('clover-scene');
            document.body.classList.add('luck-scene');
            text10.classList.remove('hien-thi');
            text11.classList.remove('hien-thi');
            text12.classList.remove('hien-thi');
            cloverStage.classList.remove('hien-thi','give-away');
            wishBackdrop.className = '';
            wishBackdrop.style.cssText = '';

            khungMat.classList.remove('gift-centered','canh-chuc','canh-muon','me-man','wish-smile');
            traMatTinyVeChinhGiua();
            khungMat.classList.remove('wish-beauty');
            khungMat.classList.add('wish-clover','wish-luck');
            trucXElements.forEach(tx => { tx.style.transform = 'translate(0px,0px)'; });
            matElements.forEach(eye => {
                eye.style.visibility = 'visible';
                eye.style.animation = 'none';
                eye.classList.remove('wish-blink','wish-wink');
            });

            luckStage.classList.remove('active');
            if (luckFrontField) luckFrontField.classList.remove('hien-thi','active');
            luckStage.classList.add('hien-thi');
            if (luckFrontField) luckFrontField.classList.add('hien-thi');
            if(TINY_PERF.mobile) {
                afterPaintIfCurrent('luck', () => {
                    luckStage.classList.add('active');
                    if(luckFrontField) luckFrontField.classList.add('active');
                }, 105);
                
                afterPaintIfCurrent('luck',()=>luckCanvasLeaves.start(),350);
            } else {
                requestAnimationFrame(()=>{
                    if(activeWish!=='luck')return;
                    luckStage.classList.add('active');
                    if(luckFrontField) luckFrontField.classList.add('active');
                });
                afterPaintIfCurrent('luck',()=>luckCanvasLeaves.start(),90);
            }
            setTimeout(() => { if(activeWish==='luck') text12.classList.add('hien-thi'); }, 140);

            
            Promise.all([moMatMayManTai(0, 210), moMatMayManTai(1, 210)]).then(() => {
                if (activeWish === 'luck') henChopMat();
            });

            setTimeout(() => { canClick = true; }, 900);
        }


        function phatDongTacMotMatHoiNghieng() {
            
            
            trucXElements.forEach(host => {
                const arc = host.querySelector('.mat-cong');
                if (arc) {
                    arc.classList.remove('hien','hold-closed');
                    arc.style.opacity = '0';
                }
            });
            matElements.forEach(eye => {
                eye.classList.remove('hold-closed','nham','wish-blink','wish-wink');
                eye.style.opacity = '1';
                eye.style.transform = 'scaleY(1)';
            });
            khungMat.classList.add('question-one-eye');
            return tinyReferenceWink.holdOppositeEye();
        }

        function datTamSangDungTrenTuCoThe() {
            if (!questionStage || !text13) return;
            const word = text13.querySelector('.question-blue-words');
            if (!word) return;
            const r = word.getBoundingClientRect();
            const stage = questionStage.getBoundingClientRect();
            const x = r.left + r.width * .5 - stage.left;
            const y = r.top + r.height * .53 - stage.top;
            questionStage.style.setProperty('--word-x', x.toFixed(1) + 'px');
            questionStage.style.setProperty('--word-y', y.toFixed(1) + 'px');
        }
        let tinyQuestionResizeTimer = 0;
        window.addEventListener('resize', () => {
            if (activeWish !== 'question') return;
            clearTimeout(tinyQuestionResizeTimer);
            tinyQuestionResizeTimer = setTimeout(datTamSangDungTrenTuCoThe, 120);
        }, {passive:true});


        
        
        
        const text14 = document.getElementById('text-14');
        const text15 = document.getElementById('text-15');
        const text16 = document.getElementById('text-16');
        const stageNhoBe = document.getElementById('stage-nho-be');
        const stageDiuDang = document.getElementById('stage-diu-dang');
        const stageHanhTrinh = document.getElementById('stage-hanh-trinh');

        function anCacStageTamSu() {
            [text14, text15, text16].forEach(t => { if (t) t.classList.remove('hien-thi'); });
            [stageNhoBe, stageDiuDang, stageHanhTrinh].forEach(s => { if (s) s.classList.remove('hien-thi'); });
        }

        function catDatLuckStageTamSu() {
            luckCanvasLeaves.stop();
            luckStage.classList.add('fading-out');
            if (luckFrontField) luckFrontField.classList.add('fading-out');
            setTimeout(() => {
                luckStage.classList.remove('hien-thi', 'active', 'fading-out');
                if (luckFrontField) luckFrontField.classList.remove('hien-thi', 'active', 'fading-out');
            }, 1100);
        }

        function thietLapMatTamSu(closed) {
            traMatTinyVeChinhGiua();
            khungMat.classList.remove('gift-centered', 'canh-chuc', 'canh-muon', 'me-man',
                                      'wish-smile', 'question-one-eye', 'wish-clover', 'wish-luck',
                                      'wish-tender-closed');
            khungMat.classList.add('wish-tender');
            if (closed) khungMat.classList.add('wish-tender-closed');
            
            trucXElements.forEach(tx => {
                const xs = tx.querySelector('.clover-x-svg');
                if (xs) xs.remove();
                const arc = tx.querySelector('.mat-cong');
                if (arc) { arc.classList.remove('hold-closed'); }
            });
            matElements.forEach(eye => {
                eye.classList.remove('wish-blink', 'wish-wink', 'nham');
            });
        }

        function batDauCanhNhoBe() {
            
            
            budgetSceneTransition(950);
            canClick = false;
            ngatChopMat();
            activeWish = 'nho-be';
            document.body.classList.remove('luck-scene', 'clover-scene');
            document.body.classList.add('tender-scene-body');
            text12.classList.remove('hien-thi');
            if (text13) text13.classList.remove('hien-thi');
            catDatLuckStageTamSu();
            thietLapMatTamSu(false);
            if (stageNhoBe) stageNhoBe.classList.add('hien-thi');
            setTimeout(() => { if (activeWish === 'nho-be' && text14) text14.classList.add('hien-thi'); }, 720);
            setTimeout(() => { if (activeWish === 'nho-be') canClick = true; }, 1250);
        }

        function batDauCanhDiuDang() {
            
            
            budgetSceneTransition(950);
            canClick = false;
            ngatChopMat();
            activeWish = 'diu-dang';
            if (text14) text14.classList.remove('hien-thi');
            if (stageNhoBe) stageNhoBe.classList.remove('hien-thi');
            thietLapMatTamSu(true);
            if (stageDiuDang) stageDiuDang.classList.add('hien-thi');
            setTimeout(() => { if (activeWish === 'diu-dang' && text15) text15.classList.add('hien-thi'); }, 680);
            setTimeout(() => { if (activeWish === 'diu-dang') canClick = true; }, 1250);
        }

        function batDauCanhHanhTrinh() {
            
            
            budgetSceneTransition(950);
            canClick = false;
            ngatChopMat();
            activeWish = 'hanh-trinh';
            if (text15) text15.classList.remove('hien-thi');
            if (stageDiuDang) stageDiuDang.classList.remove('hien-thi');
            thietLapMatTamSu(false);
            if (stageHanhTrinh) stageHanhTrinh.classList.add('hien-thi');
            setTimeout(() => {
                if (activeWish !== 'hanh-trinh') return;
                if (text16) text16.classList.add('hien-thi');
                setTimeout(() => { if (activeWish === 'hanh-trinh' && !ngungChopTuDong) kichHoatChuKyChop(); }, 1600);
            }, 680);
            setTimeout(() => { if (activeWish === 'hanh-trinh') canClick = true; }, 1250);
        }

        

        function batDauCanhLieuCoThe() {
            
            const v13Entry=document.getElementById('tiny-question-entry-v13');
            if(v13Entry){
                requestAnimationFrame(()=>{
                    if(v13Entry.isConnected) v13Entry.classList.add('v13-playing');
                });
                setTimeout(()=>v13Entry.classList.remove('v13-playing'),920);
            }
            budgetSceneTransition(1120);
            canClick = false;
            ngatChopMat();
            activeWish = 'question';
            luckCanvasLeaves.stop();
            document.body.classList.remove('luck-scene','clover-scene');
            document.body.classList.add('question-scene-body');

            text12.classList.remove('hien-thi');
            if (text13) text13.classList.remove('hien-thi');
            anCacStageTamSu();
            if(TINY_PERF.mobile) {
                document.documentElement.classList.add('tiny-luck-exit','tiny-v8-question-enter');
                
                requestAnimationFrame(() => requestAnimationFrame(() => {
                    if(activeWish !== 'question') return;
                    luckStage.classList.add('tiny-v8-fade-luck');
                    luckFrontField?.classList.add('tiny-v8-fade-luck');
                }));
            }
            luckStage.classList.add('fading-out');
            if (luckFrontField) luckFrontField.classList.add('fading-out');

            
            
            const tinyV8SetupQuestionEyes = () => {
                if(activeWish!=='question') return;
                traMatTinyVeChinhGiua();
                khungMat.classList.remove('gift-centered','canh-chuc','canh-muon','me-man','wish-smile','question-one-eye');
                khungMat.classList.remove('wish-beauty');
                khungMat.classList.add('wish-clover','wish-luck');
                trucXElements.forEach(tx => { tx.style.transform = 'translate(0px,0px)'; });
                matElements.forEach(eye => {
                    eye.style.visibility = 'visible';
                    eye.style.opacity = '1';
                    eye.style.animation = 'none';
                    eye.style.transform = 'scaleY(1)';
                    eye.classList.remove('wish-blink','wish-wink','nham','hold-closed');
                });
                trucXElements.forEach(tx => {
                    const arc = tx.querySelector('.mat-cong');
                    if (arc) { arc.classList.remove('hold-closed'); arc.style.opacity='0'; }
                });
            };
            if (TINY_PERF.mobile) requestAnimationFrame(() => requestAnimationFrame(tinyV8SetupQuestionEyes));
            else tinyV8SetupQuestionEyes();

            if (questionStage) {
                if(TINY_PERF.mobile) {
                    document.documentElement.classList.add('tiny-v9-question-crossfade');
                    setTimeout(()=>{if(activeWish==='question')questionStage.classList.add('hien-thi')},200);
                    setTimeout(()=>document.documentElement.classList.remove('tiny-v9-question-crossfade'),1200);
                } else questionStage.classList.add('hien-thi');
                

            }
            setTimeout(() => {
                if (activeWish !== 'question') return;
                if (questionStage) questionStage.classList.add('active');
                
            }, 700);
            if(TINY_PERF.mobile) setTimeout(()=>{
                if(activeWish!=='question')return;
                luckStage.classList.add('tiny-v8-retired-luck');
                luckFrontField?.classList.add('tiny-v8-retired-luck');
            }, 445);
            
            
            
            
            canClick = true;
            setTimeout(() => {
                if (activeWish !== 'question') return;
                if (text13) text13.classList.add('hien-thi');
                requestAnimationFrame(()=>requestAnimationFrame(datTamSangDungTrenTuCoThe));
            }, 760);
            setTimeout(()=>{
                if(activeWish === 'question') phatDongTacMotMatHoiNghieng();
            }, 930);
            setTimeout(() => {
                luckStage.classList.remove('hien-thi','active','fading-out');
                document.documentElement.classList.remove('tiny-luck-exit');
                if (luckFrontField) {
                    luckFrontField.classList.remove('hien-thi','active','fading-out');
                    
                    const oldLuckField=luckFrontField;
                    const clearLuck=()=>{
                        if(activeWish==='luck')return;
                        oldLuckField.replaceChildren();
                    };
                    if (TINY_PERF.mobile) {
                        
                        setTimeout(()=>{
                            if('requestIdleCallback' in window) requestIdleCallback(clearLuck,{timeout:8000});
                            else setTimeout(clearLuck,2400);
                        },3600);
                    } else if ('requestIdleCallback' in window) requestIdleCallback(clearLuck,{timeout:3500});
                    else setTimeout(clearLuck,1600);
                }
            }, 1040);
            if (TINY_PERF.mobile) setTimeout(()=>{
                document.documentElement.classList.remove('tiny-v8-question-enter');
            },1200);
        }

        let cloverGiveRaf = 0;

        function batDauCanhCamLayDi() {
            
            
            if (TINY_PERF.mobile) setTimeout(() => {
                if (activeWish === 'clover') taoCanhMayManMotLan();
            }, 660);
            canClick = false;
            ngatChopMat();
            activeWish = 'clover';
            khungMat.classList.add('gift-centered');
            text10.classList.remove('hien-thi');
            text11.classList.add('hien-thi');
            moMotMatBenCoBonLa().then(() => {
                if (activeWish !== 'clover' || !khungMat.classList.contains('gift-centered')) return;
                matElements[1].style.transform = '';
                matElements[1].classList.add('thuc');
                henChopMat();
            });
            phatHieuUngCamLayDiMuot();
            if (TINY_PERF.mobile) {
                setTimeout(() => {
                    if(activeWish==='clover') {
                        if ('requestIdleCallback' in window) requestIdleCallback(()=>{
                            if(activeWish==='clover') luckCanvasLeaves.prepare();
                        },{timeout:600});
                        else luckCanvasLeaves.prepare();
                    }
                }, 440);
            }
            setTimeout(() => {
                if (activeWish === 'clover') canClick = true;
            }, 760);
        }

        function phatHieuUngCamLayDiMuot() {
            cancelAnimationFrame(cloverGiveRaf);
            const garden = document.getElementById('clover-sample-garden');
            const glow = garden ? garden.querySelector('.clover-sample-glow') : null;
            const plant = garden ? garden.querySelector('.clover-sample-plant') : null;
            const ambient = cloverStage ? cloverStage.querySelector('.clover-ambient') : null;
            const particles = document.getElementById('clover-particle-field');
            if (!garden || !glow || !plant || !ambient) {
                setTimeout(() => {
                    cloverStage.classList.remove('hien-thi','give-away');
                    text11.classList.remove('hien-thi');
                    wishBackdrop.className = '';
                    wishBackdrop.style.cssText = '';
                    xoaDomDomCoBonLa();
                }, 2400);
                return;
            }

            const lerp = (a,b,t)=>a+(b-a)*t;
            const clamp = t => Math.max(0, Math.min(1, t));
            const smooth = t => t*t*(3 - 2*t);
            const sine = t => (1 - Math.cos(Math.PI * t)) / 2;
            const glowDur = 1320;
            const fadeDur = 760;
            const totalDur = glowDur + fadeDur;

            
            cloverStage.classList.remove('give-away');
            garden.style.transition = 'none';
            garden.style.opacity = '1';
            garden.style.transform = 'translateY(-10px) scale(1.06)';
            garden.style.animation = 'cloverSampleFloat 4.4s ease-in-out 1.7s infinite alternate';
            glow.style.transform = 'translate(-50%,-50%)';
            glow.style.animation = 'none';
            plant.style.animation = 'none';
            ambient.style.animation = 'none';
            if (particles) {
                particles.style.transition = 'none';
                particles.style.opacity = '1';
                particles.style.animation = 'none';
            }
            taoDomDomCoBonLa();

            wishBackdrop.className = 'clover-give';
            wishBackdrop.style.animation = 'none';
            wishBackdrop.style.opacity = '0';

            function setCloverGlow(v) {
                if (TINY_PERF.mobile) {
                    
                    glow.style.opacity = String(.68 + .32*v);
                    glow.style.transform = `translate(-50%,-50%) scale(${(.90 + .21*v).toFixed(3)})`;
                    ambient.style.opacity = String(.73 + .22*v);
                    garden.style.opacity = '1';
                    plant.style.opacity = '1';
                    wishBackdrop.style.opacity = '0';
                    return;
                }
                
                const r1 = lerp(16, 34, v);
                const r2 = lerp(38, 92, v);
                const r3 = lerp(92, 198, v);
                const a1 = lerp(1.00, 1.00, v);
                const a2 = lerp(.94, 1.00, v);
                const a3 = lerp(.76, .98, v);
                const bright = lerp(1.02, 1.32, v);
                plant.style.filter = `drop-shadow(0 0 ${r1.toFixed(2)}px rgba(110,255,172,${a1.toFixed(3)})) drop-shadow(0 0 ${r2.toFixed(2)}px rgba(52,245,128,${a2.toFixed(3)})) drop-shadow(0 0 ${r3.toFixed(2)}px rgba(30,200,90,${a3.toFixed(3)})) brightness(${bright.toFixed(3)})`;
                glow.style.opacity = String(lerp(.90, 1, v));
                glow.style.filter = `blur(${lerp(5, 22, v).toFixed(2)}px)`;
                ambient.style.opacity = String(lerp(.88, 1, v));
                garden.style.opacity = '1';
                plant.style.opacity = '1';
                if (particles) particles.style.opacity = '1';
                wishBackdrop.style.opacity = '0';
                wishBackdrop.style.background = 'none';
            }

            function setCloverFade(v) {
                const p = clamp(v);
                const remain = 1 - p;
                if (TINY_PERF.mobile) {
                    
                    plant.style.opacity = String(remain);
                    glow.style.opacity = String(remain);
                    glow.style.transform = `translate(-50%,-50%) scale(${(1.11+.12*p).toFixed(3)})`;
                    ambient.style.opacity = String(.90*(1-p));
                    garden.style.opacity = String(remain);
                    const bloom = Math.sin(Math.PI*p);
                    wishBackdrop.style.opacity = String(Math.max(0, .92*bloom));
                    return;
                }
                
                const r1 = lerp(34, 4, p);
                const r2 = lerp(92, 10, p);
                const r3 = lerp(198, 18, p);
                const a1 = lerp(1.00, .08, p);
                const a2 = lerp(1.00, .05, p);
                const a3 = lerp(.98, 0.00, p);
                const bright = lerp(1.32, .92, p);
                plant.style.filter = `drop-shadow(0 0 ${r1.toFixed(2)}px rgba(110,255,172,${a1.toFixed(3)})) drop-shadow(0 0 ${r2.toFixed(2)}px rgba(52,245,128,${a2.toFixed(3)})) drop-shadow(0 0 ${r3.toFixed(2)}px rgba(30,200,90,${a3.toFixed(3)})) brightness(${bright.toFixed(3)})`;
                plant.style.opacity = String(remain);
                glow.style.opacity = String(remain);
                glow.style.filter = `blur(${lerp(22, 32, p).toFixed(2)}px)`;
                ambient.style.opacity = String(lerp(1.00, .10, p));
                garden.style.opacity = String(remain);
                if (particles) particles.style.opacity = '1';

                
                const spread = smooth(p);
                const bloom = Math.sin(Math.PI * Math.min(1, p * 0.96));
                const sizeX = lerp(12, 186, spread);
                const sizeY = lerp(16, 172, spread);
                const coreA = lerp(.14, .38, bloom);
                const midA = lerp(.08, .24, bloom);
                const outerA = lerp(.03, .14, bloom);
                const globalA = lerp(0, .28, Math.max(0, p - 0.10) / 0.90);
                wishBackdrop.style.background = `radial-gradient(ellipse ${sizeX.toFixed(2)}vw ${sizeY.toFixed(2)}vh at 79% 49%, rgba(186,255,205,${coreA.toFixed(3)}) 0%, rgba(118,255,168,${midA.toFixed(3)}) 26%, rgba(63,199,112,${outerA.toFixed(3)}) 56%, rgba(20,58,33,0) 84%), linear-gradient(rgba(70,190,116,${globalA.toFixed(3)}), rgba(70,190,116,${globalA.toFixed(3)}))`;
                wishBackdrop.style.opacity = String(Math.max(0.14, bloom) * 0.99);

                taoDomDomCoBonLa();
            }

            let start = null;
            function frame(ts) {
                if (activeWish !== 'clover') return;
                if (start === null) start = ts;
                const elapsed = ts - start;
                if (elapsed <= glowDur) {
                    setCloverGlow(sine(clamp(elapsed / glowDur)));
                } else {
                    setCloverFade(smooth(clamp((elapsed - glowDur) / fadeDur)));
                }

                if (elapsed < totalDur) {
                    cloverGiveRaf = requestAnimationFrame(frame);
                } else {
                    setCloverFade(1);
                    cloverStage.classList.remove('hien-thi','give-away');
                    text11.classList.remove('hien-thi');
                    wishBackdrop.className = '';
                    wishBackdrop.style.cssText = '';
                    garden.style.cssText = '';
                    glow.style.cssText = '';
                    plant.style.cssText = '';
                    ambient.style.cssText = '';
                    if (particles) particles.style.cssText = '';
                    xoaDomDomCoBonLa();
                }
            }
            cloverGiveRaf = requestAnimationFrame(frame);
        }

        function batDauCanhCoBonLa() {
            budgetSceneTransition(850);
            canClick = false;
            ngatChopMat();
            activeWish = 'clover';
            tinyV8CloverParticleOrigin = null;
            khungMat.classList.remove('gift-centered');
            document.body.classList.add('clover-scene');
            tinyReferenceWink.clear();
            text9.classList.remove('hien-thi');
            stopLyricSync();
            lyricSlots.forEach(el => el.classList.remove('show','compact'));
            lyricZone.classList.remove('hien-thi');
            lyricZone.setAttribute('aria-hidden','true');
            smileStage.classList.remove('hien-thi');
            
            window.tinyWaguriRevealId = (window.tinyWaguriRevealId || 0) + 1;
            const waguriSmile = document.getElementById('waguri-smile-video');
            if (TINY_PERF.mobile) {
                
                document.documentElement.classList.add('tiny-v6-clover-switch');
                setTimeout(() => {
                    if (activeWish !== 'clover') return;
                    if (waguriSmile) { try { waguriSmile.pause(); } catch (_) {} }
                    lyricSlots.forEach(el => { el.textContent=''; });
                }, 240);
                setTimeout(() => {
                    smileStage.classList.remove('waguri-frame-visible');
                    document.documentElement.classList.remove('tiny-v6-clover-switch');
                }, 1060);
            } else {
                lyricSlots.forEach(el => { el.textContent=''; });
                if (waguriSmile) {
                    try { waguriSmile.pause(); } catch (e) {}
                    try { waguriSmile.currentTime = 0; } catch (e) {}
                }
                setTimeout(() => smileStage.classList.remove('waguri-frame-visible'), 800);
            }
            wishBackdrop.className = 'clover';
            traMatTinyVeChinhGiua();
            khungMat.classList.remove('wish-beauty','wish-smile');
            khungMat.classList.add('wish-clover');
            trucXElements.forEach(tx => { tx.style.transform = 'translate(0px,0px)'; });
            matElements.forEach(eye => {
                eye.style.visibility = 'visible';
                eye.style.animation = 'none';
                eye.style.transform = 'scaleY(1)';
                eye.classList.remove('wish-blink','wish-wink');
            });
            setTimeout(() => {
                if(activeWish!=='clover')return;
                cloverStage.classList.add('hien-thi');
                if(TINY_PERF.mobile) {
                    afterPaintIfCurrent('clover',batDauHatSangCoBonLa,410);
                    afterPaintIfCurrent('clover',taoDomDomCoBonLa,580);
                } else {
                    batDauHatSangCoBonLa();
                    taoDomDomCoBonLa();
                }
                const text10Word = document.querySelector('#text-10 .clover-word');
                if (text10Word) text10Word.style.textShadow = '0 0 12px rgba(108,255,152,.92), 0 0 24px rgba(108,255,152,.62), 0 0 46px rgba(70,234,122,.52)';
            }, 340);
            setTimeout(() => text10.classList.add('hien-thi'), 560);
            if (TINY_PERF.mobile) {
                
                
                afterPaintIfCurrent('clover', () => {
                    const warm = () => {
                        if(activeWish!=='clover' || document.hidden) return;
                        luckCanvasLeaves.prepare();
                    };
                    if ('requestIdleCallback' in window) requestIdleCallback(warm,{timeout:1400});
                    else setTimeout(warm,140);
                }, 1400);
            }
            
            
            
            setTimeout(() => {
                if (activeWish !== 'clover') return;
                cloverXEyes.play();
            }, TINY_PERF.mobile ? 155 : 40);
            setTimeout(() => {
                if (activeWish !== 'clover') return;
                canClick = true;
            }, 1050);
        }

        
        
        const NHAM_DUR = 0.82;
        const NHAM_SX = [0.38, 0.64];                
        const NHAM_TY = [3, 4];                      
        const SVGNS_NHAM = 'http://www.w3.org/2000/svg';
        let nhamMat = null;

        
        const NHAM_MO = {
            start: [40, -43],
            seg: [
                [66.7, -43, 93.3, -43, 120, -43],
                [142.1, -43, 160, -25.1, 160, -3],
                [160, 23.7, 160, 50.3, 160, 77],
                [160, 99.1, 142.1, 117, 120, 117],
                [93.3, 117, 66.7, 117, 40, 117],
                [17.9, 117, 0, 99.1, 0, 77],
                [0, 50.3, 0, 23.7, 0, -3],
                [0, -25.1, 17.9, -43, 40, -43]
            ]
        };

        function nhamArc(cx, cy, r, a0, a1) {
            const R = Math.PI / 180, k = 4 / 3 * Math.tan((a1 - a0) * R / 4);
            const p0 = [cx + r * Math.cos(a0 * R), cy + r * Math.sin(a0 * R)];
            const p1 = [cx + r * Math.cos(a1 * R), cy + r * Math.sin(a1 * R)];
            return [
                p0[0] + k * r * -Math.sin(a0 * R), p0[1] + k * r * Math.cos(a0 * R),
                p1[0] - k * r * -Math.sin(a1 * R), p1[1] - k * r * Math.cos(a1 * R),
                p1[0], p1[1]
            ];
        }

        
        function nhamDai(bend) {
            const h = 4.5;
            const yE = 37 - 3 * bend, yQ = 37 + 10 * bend;       
            const P0 = [18, yE], P3 = [142, yE];
            const C1 = [P0[0] + 2 / 3 * (80 - P0[0]), P0[1] + 2 / 3 * (yQ - P0[1])];
            const C2 = [P3[0] + 2 / 3 * (80 - P3[0]), P3[1] + 2 / 3 * (yQ - P3[1])];
            let tx = C1[0] - P0[0], ty = C1[1] - P0[1], L = Math.hypot(tx, ty); tx /= L; ty /= L;
            let nx = -ty, ny = tx; if (ny < 0) { nx = -nx; ny = -ny; }
            let ux = P3[0] - C2[0], uy = P3[1] - C2[1]; L = Math.hypot(ux, uy); ux /= L; uy /= L;
            let mx = -uy, my = ux; if (my < 0) { mx = -mx; my = -my; }
            const R = 180 / Math.PI;
            const aR = Math.atan2(-my, -mx) * R, aL = Math.atan2(ny, nx) * R;
            return {
                start: [P0[0] - h * nx, P0[1] - h * ny],
                seg: [
                    [C1[0] - h / ny * nx, C1[1] - h, C2[0] - h / my * mx, C2[1] - h, P3[0] - h * mx, P3[1] - h * my],
                    nhamArc(P3[0], P3[1], h, aR, aR + 45),
                    nhamArc(P3[0], P3[1], h, aR + 45, aR + 135),
                    nhamArc(P3[0], P3[1], h, aR + 135, aR + 180),
                    [C2[0] + h / my * mx, C2[1] + h, C1[0] + h / ny * nx, C1[1] + h, P0[0] + h * nx, P0[1] + h * ny],
                    nhamArc(P0[0], P0[1], h, aL, aL + 45),
                    nhamArc(P0[0], P0[1], h, aL + 45, aL + 135),
                    nhamArc(P0[0], P0[1], h, aL + 135, aL + 180)
                ]
            };
        }

        const nhamLerp = (a, b, t) => a + (b - a) * t;

        
        function nhamNhip(x) {
            return x * x * (3 - 2 * x);
        }

        function nhamHinh(p) {
            const dich = nhamDai(p);
            const st = [nhamLerp(NHAM_MO.start[0], dich.start[0], p), nhamLerp(NHAM_MO.start[1], dich.start[1], p)];
            let d = 'M ' + st[0].toFixed(2) + ' ' + st[1].toFixed(2);
            for (let i = 0; i < NHAM_MO.seg.length; i++) {
                const v = NHAM_MO.seg[i].map((n, k) => nhamLerp(n, dich.seg[i][k], p).toFixed(2));
                d += ' C ' + v[0] + ' ' + v[1] + ', ' + v[2] + ' ' + v[3] + ', ' + v[4] + ' ' + v[5];
            }
            return d + ' Z';
        }

        
        const NHAM_MAU = {
            tam0: [255, 156, 203], tam1: [255, 183, 217],     
            rim0: [251, 196, 223], rim1: [253, 216, 234]    
        };
        const nhamRgb = (a, b, t) => 'rgb(' + [0, 1, 2].map(i => Math.round(nhamLerp(a[i], b[i], t))).join(',') + ')';

        function nhamVe(p) {
            if (!nhamMat) return;
            const lo = nhamRgb(NHAM_MAU.tam0, NHAM_MAU.tam1, p);
            const rim = nhamRgb(NHAM_MAU.rim0, NHAM_MAU.rim1, p);
            
            const f = 'drop-shadow(0 0 ' + nhamLerp(NHAM_GLOW.b0, 7, p).toFixed(2) + 'px rgba(243,68,154,' + nhamLerp(NHAM_GLOW.a0, 0.92, p).toFixed(3) + ')) ' +
                      'drop-shadow(0 0 ' + nhamLerp(NHAM_GLOW.b1, 15, p).toFixed(2) + 'px rgba(246,107,191,' + nhamLerp(NHAM_GLOW.a1, 0.57, p).toFixed(3) + '))';
            const d = nhamHinh(p);
            nhamMat.forEach((m, i) => {
                m.path.setAttribute('d', d);
                m.sLoi.setAttribute('stop-color', lo);
                m.sRim.setAttribute('stop-color', rim);
                m.svg.style.transform = 'translateY(' + nhamLerp(0, NHAM_TY[i], p).toFixed(3) + 'px) scaleX(' + nhamLerp(1, NHAM_SX[i], p).toFixed(4) + ')';
                m.svg.style.filter = f;
            });
        }

        const NHAM_GLOW = { b0: 20, a0: 1.0, b1: 34, a1: 0.6 };   

        function nhamKetThuc() {
            if (!nhamMat) return;
            trucXElements.forEach(tx => tx.querySelector('.mat-cong').classList.add('hien'));
            nhamMat.forEach(m => { m.svg.style.opacity = '0'; });
        }

        function batDauNhamMat() {
            nhamMat = [...trucXElements].map((tx, i) => {
                const svg = document.createElementNS(SVGNS_NHAM, 'svg');
                svg.setAttribute('class', 'mat-hinh');
                svg.setAttribute('viewBox', '0 0 160 70');
                svg.setAttribute('aria-hidden', 'true');
                
                svg.innerHTML =
                    '<defs><radialGradient id="nhamG' + i + '" gradientUnits="objectBoundingBox" cx="0.5" cy="0.5" r="0.72">' +
                    '<stop offset="0" stop-color="#ff9ccb" class="loi"/><stop offset="0.5" stop-color="#ff9ccb" class="loi2"/><stop offset="1" stop-color="#fbc4df" class="rim"/>' +
                    '</radialGradient></defs>' +
                    '<path fill="url(#nhamG' + i + ')" />';
                tx.appendChild(svg);
                const stops = svg.querySelectorAll('stop');
                
                const sLoi = { setAttribute: (k, v) => { stops[0].setAttribute(k, v); stops[1].setAttribute(k, v); } };
                return { svg: svg, path: svg.querySelector('path'), sLoi: sLoi, sRim: stops[2] };
            });
            nhamVe(0);
            nhamMat.forEach(m => { m.svg.style.opacity = '1'; });
            const t0 = performance.now();
            const buocToiThieu = 1000 / (window.innerWidth <= 600 ? 30 : 45);
            let veLanCuoi = -Infinity;
            function buoc(now) {
                const x = Math.min(1, (Math.max(now, t0) - t0) / 1000 / NHAM_DUR);
                if (now - veLanCuoi >= buocToiThieu || x === 1) {
                    nhamVe(nhamNhip(x));
                    veLanCuoi = now;
                }
                if (x < 1) requestAnimationFrame(buoc);
                else nhamKetThuc();
            }
            requestAnimationFrame(buoc);
        }


        
        
        const SHARE_FLIGHT_URL = location.href.split(/[?#]/)[0].replace(/index\.html$/, '');
        const shareFlightScene = document.getElementById('share-flight-scene');
        const shareFlightDevice = document.getElementById('share-flight-device');
        const shareFuelButton = document.getElementById('share-fuel-button');
        const shareFuelLiquid = document.getElementById('share-fuel-liquid');
        const shareFuelWords = shareFuelButton.querySelector('.share-fuel-words strong');
        const shareFuelMeter = document.getElementById('share-fuel-meter');
        
        function syncFuelEatenText() {
            if (!shareFuelWords) return;
            const surfaceY = shareFuelLiquid.getBoundingClientRect().top;
            const word = shareFuelWords.getBoundingClientRect();
            if (!word.height) return;
            const eaten = Math.max(0,Math.min(100,100*(surfaceY-word.top)/word.height));
            shareFuelWords.style.clipPath = 'inset('+eaten.toFixed(2)+'% 0 0 0)';
        }
        const shareAirplane = document.getElementById('share-aircraft');
        const shareAirplaneStand = document.getElementById('share-aircraft-stand');
        let sharePlaneReady = false;
        let sharePlaneLaunched = false;
        const shareFlightStatus = document.getElementById('share-flight-status');
        const shareManualLink = document.getElementById('share-copy-manual');
        const shareCopyToast = document.createElement('div');
        shareCopyToast.className = 'tiny-copy-toast';
        shareCopyToast.setAttribute('role','status');
        shareCopyToast.setAttribute('aria-live','polite');
        document.body.appendChild(shareCopyToast);
        let shareToastTimer = null;
        function notifyShareCopy(success) {
            clearTimeout(shareToastTimer);
            shareCopyToast.replaceChildren();
            shareCopyToast.classList.toggle('copy-failed',!success);
            if (success) {
                shareCopyToast.textContent='✓ Đã sao chép';
            } else {
                shareCopyToast.append('Không thể tự sao chép. Chạm giữ liên kết để sao chép:');
                const link=document.createElement('a');
                link.href=SHARE_FLIGHT_URL;
                link.textContent=SHARE_FLIGHT_URL;
                link.target='_blank';link.rel='noopener noreferrer';
                shareCopyToast.appendChild(link);
            }
            shareCopyToast.classList.add('show');
            shareToastTimer=setTimeout(()=>shareCopyToast.classList.remove('show'),success?4600:11000);
        }
        const sharePipePath = document.getElementById('share-hose-flow-path');
        const sharePipeDrops = document.getElementById('share-flow-droplets');
        const shareFuelNozzle = shareFlightDevice.querySelector('.share-fuel-nozzle');
        const shareHoseSvg = shareFlightDevice.querySelector('.share-fuel-hose');
        const shareFuelPort = shareAirplane.querySelector('.share-fuel-port');
        const shareHosePaths = [...shareHoseSvg.querySelectorAll('.share-hose-dark, .share-hose-outline, .share-hose-flow')];
        let shareHoseSyncFrame = 0;
        function syncShareFuelHose() {
            const deviceRect = shareFlightDevice.getBoundingClientRect();
            const buttonRect = shareFuelButton.getBoundingClientRect();
            if (!deviceRect.width || !deviceRect.height || !buttonRect.width || !buttonRect.height) return;

            
            shareFuelNozzle.style.left = (buttonRect.right - deviceRect.left - 3) + 'px';
            shareFuelNozzle.style.top = (buttonRect.top - deviceRect.top + buttonRect.height * .51) + 'px';
            shareFuelNozzle.style.bottom = 'auto';
            shareFuelNozzle.style.transform = 'translateY(-50%)';

            const nozzleRect = shareFuelNozzle.getBoundingClientRect();
            const portRect = shareFuelPort.getBoundingClientRect();
            const x1 = nozzleRect.right - deviceRect.left;
            const y1 = (nozzleRect.top + nozzleRect.height / 2) - deviceRect.top;
            const x2 = (portRect.left + portRect.width / 2) - deviceRect.left;
            const y2 = (portRect.top + portRect.height / 2) - deviceRect.top;
            const dx = x2 - x1;
            if (!Number.isFinite(dx) || dx < 8) return;

            
            shareHoseSvg.setAttribute('viewBox', `0 0 ${deviceRect.width} ${deviceRect.height}`);
            const sag = Math.max(5, Math.min(22, dx * .025));
            const d = `M ${x1} ${y1} C ${x1 + dx * .18} ${y1}, ${x1 + dx * .2} ${y2 + sag}, ${x1 + dx * .48} ${y2 + sag} C ${x1 + dx * .72} ${y2 + sag}, ${x2 - dx * .12} ${y2}, ${x2} ${y2}`;
            shareHosePaths.forEach(path => path.setAttribute('d', d));
        }
        function queueShareFuelHoseSync() {
            if (shareHoseSyncFrame) return;
            shareHoseSyncFrame = requestAnimationFrame(() => {
                shareHoseSyncFrame = 0;
                syncShareFuelHose();
            });
        }
        if (typeof ResizeObserver === 'function') {
            const shareHoseResizeObserver = new ResizeObserver(queueShareFuelHoseSync);
            [shareFlightDevice, shareFuelButton, shareAirplaneStand].forEach(el => shareHoseResizeObserver.observe(el));
        }
        window.addEventListener('resize', queueShareFuelHoseSync, {passive:true});
        window.addEventListener('orientationchange', queueShareFuelHoseSync, {passive:true});
        requestAnimationFrame(syncShareFuelHose);
        let shareFuelStarted = false;
        const shareTiny = document.getElementById('share-tiny');
        let shareTinyTimeout = null;
        let shareTinyBlinkTimeout = null;
        function scheduleTinyLookAtAgree() {
            if (activeWish !== 'share' || shareFuelStarted) return;
            shareTinyTimeout = setTimeout(() => {
                if (activeWish !== 'share' || shareFuelStarted) return;
                shareTiny.classList.add('share-tiny-look');
                shareTinyTimeout = setTimeout(() => {
                    shareTiny.classList.remove('share-tiny-look');
                    scheduleTinyLookAtAgree();
                }, 1350);
            }, 2400 + Math.random()*2700);
        }
        function scheduleShareTinyBlink() {
            if (activeWish !== 'share' || shareFuelStarted) return;
            shareTinyBlinkTimeout = setTimeout(() => {
                if (activeWish !== 'share' || shareFuelStarted) return;
                shareTiny.classList.add('share-tiny-blink');
                setTimeout(() => {
                    shareTiny.classList.remove('share-tiny-blink');
                    scheduleShareTinyBlink();
                }, 200);
            }, 3300 + Math.random()*3500);
        }

        
        
        let tinyMovedToShare = false;
        function bringRealTinyToShare() {
            if (tinyMovedToShare) return;
            tinyMovedToShare = true;
            const before = khungMat.getBoundingClientRect();
            
            khungMat.classList.remove('question-one-eye','wish-clover','wish-luck','wish-smile','canh-muon','canh-chuc','me-man');
            khungMat.querySelectorAll('.truc-x').forEach(eye => {
                eye.classList.remove('reference-wink-active');
                eye.style.transform=''; eye.style.animation='';
            });
            matElements.forEach(eye => {
                eye.classList.remove('nham','wish-blink','wish-wink','hold-closed');
                eye.style.removeProperty('transform');eye.style.removeProperty('animation');
                eye.style.removeProperty('opacity');eye.style.removeProperty('visibility');
                eye.style.removeProperty('transition');eye.style.removeProperty('clip-path');
                eye.style.removeProperty('height');
            });
            khungMat.style.removeProperty('animation');
            khungMat.style.removeProperty('transform');
            shareTiny.appendChild(khungMat);
            shareTiny.classList.remove('share-tiny-look');
            shareTiny.classList.add('share-tiny-native');
            
            const after = khungMat.getBoundingClientRect();
            const bx = before.left + before.width/2, by = before.top + before.height/2;
            const ax = after.left + after.width/2, ay = after.top + after.height/2;
            const sx = Math.min(4, before.width/Math.max(after.width,1));
            const sy = Math.min(4, before.height/Math.max(after.height,1));
            const travel = khungMat.animate([
                {transform:`translate(${(bx-ax).toFixed(1)}px,${(by-ay).toFixed(1)}px) scale(${sx.toFixed(3)},${sy.toFixed(3)})`},
                {transform:'translate(0px,0px) scale(1,1)'}
            ],{duration:1050,easing:'cubic-bezier(.21,.76,.22,1)',fill:'none'});
            travel.onfinish = () => {khungMat.style.removeProperty('transform');};
        }
        
        
        function nativeTinyHappyMorph() {
            const ns='http://www.w3.org/2000/svg';
            
            const rounded='M 25 0 L 75 0 Q 100 0 100 25 L 100 75 Q 100 100 75 100 L 25 100 Q 0 100 0 75 L 0 25 Q 0 0 25 0 Z';
            const puffy='M 23 3 C 43 -3 57 -3 77 3 C 92 5 97 13 97 27 C 103 43 103 57 97 73 C 97 88 89 97 77 97 C 57 103 43 103 23 97 C 9 96 3 88 3 73 C -3 57 -3 43 3 27 C 5 12 12 4 23 3 Z';
            const sample=(d,count=120)=>{
                const svg=document.createElementNS(ns,'svg');
                const path=document.createElementNS(ns,'path');
                path.setAttribute('d',d);svg.appendChild(path);
                const len=path.getTotalLength();
                return Array.from({length:count},(_,i)=>{
                    const p=path.getPointAtLength(i*len/count);return [p.x,p.y];
                });
            };
            const from=sample(rounded),to=sample(puffy);
            const eyePaths=[];
            Array.from(matElements).forEach((eye,index)=>{
                eye.querySelectorAll('.tiny-morph-svg').forEach(svg=>svg.remove());
                const svg=document.createElementNS(ns,'svg');
                svg.classList.add('tiny-morph-svg');
                svg.setAttribute('viewBox','-5 -5 110 110');
                svg.setAttribute('aria-hidden','true');
                const clipId='tiny-thank-eye-clip-'+index;
                const defs=document.createElementNS(ns,'defs');
                const clip=document.createElementNS(ns,'clipPath');
                clip.setAttribute('id',clipId);
                const clipPath=document.createElementNS(ns,'path');
                clipPath.setAttribute('d',rounded);
                clip.appendChild(clipPath);defs.appendChild(clip);svg.appendChild(defs);
                const outline=document.createElementNS(ns,'path');
                outline.classList.add('tiny-morph-outline');
                outline.setAttribute('d',rounded);
                svg.appendChild(outline);
                const sparkle=document.createElementNS(ns,'g');
                sparkle.classList.add('tiny-morph-sparkles');
                sparkle.setAttribute('clip-path','url(#'+clipId+')');
                const glints=[
                    ['ellipse',22,24,9.3,12.5,'tiny-spark-main'],
                    ['ellipse',74,74,5.8,6.5,'tiny-spark-small'],
                    ['circle',66,83,2.3,0,'tiny-spark-small'],
                    ['circle',37,15,2.1,0,'tiny-spark-small'],
                    ['circle',54,31,1.8,0,'tiny-spark-small'],
                    ['ellipse',16,42,2.2,3.5,'tiny-spark-small'],
                    ['circle',78,23,2.3,0,'tiny-spark-small']
                ];
                glints.forEach(([tag,x,y,rx,ry,cls])=>{
                    const glint=document.createElementNS(ns,tag);
                    glint.setAttribute('cx',x);glint.setAttribute('cy',y);
                    if(tag==='ellipse'){glint.setAttribute('rx',rx);glint.setAttribute('ry',ry);}
                    else glint.setAttribute('r',rx);
                    glint.setAttribute('class',cls);
                    sparkle.appendChild(glint);
                });
                svg.appendChild(sparkle);
                eye.appendChild(svg);
                
                eye.classList.add('tiny-actual-morph');
                eyePaths.push({outline,clipPath});
            });
            const duration=1050,start=performance.now();
            function frame(now){
                const u=Math.min(1,Math.max(0,(now-start)/duration));
                const t=u*u*(3-2*u);
                const d='M '+from.map(([x,y],i)=>{
                    const [xx,yy]=to[i];
                    return (x+(xx-x)*t).toFixed(2)+' '+(y+(yy-y)*t).toFixed(2);
                }).join(' L ')+' Z';
                eyePaths.forEach(({outline,clipPath})=>{
                    outline.setAttribute('d',d);clipPath.setAttribute('d',d);
                });
                if(u<1 && activeWish==='share')requestAnimationFrame(frame);
            }
            requestAnimationFrame(frame);
        }

        function startShareFlightScene() {
            budgetSceneTransition(850);
            canClick = false;
            ngatChopMat();
            activeWish = 'share';
            document.querySelectorAll('.text-layer').forEach(t => t.classList.remove('hien-thi'));
            if(text13) text13.classList.remove('hien-thi');
            if(questionStage) questionStage.classList.remove('active','hien-thi');
            try { tinyReferenceWink.clear(); } catch (_) {}
            document.body.classList.add('share-finale-active');
            shareFlightScene.setAttribute('aria-hidden','false');
            
            if (!TINY_PERF.mobile) void shareFlightScene.offsetWidth;
            shareFlightScene.classList.add('share-visible');
            if (TINY_PERF.mobile) afterPaintIfCurrent('share',syncFuelEatenText,85);
            else requestAnimationFrame(syncFuelEatenText);
            clearTimeout(shareTinyTimeout);
            clearTimeout(shareTinyBlinkTimeout);
            shareTiny.classList.remove('share-tiny-blink','share-tiny-cheer','tiny-caret-restored','share-tiny-thank-glow');
            matElements.forEach(eye=>{
                eye.classList.remove('tiny-actual-morph');
                eye.querySelectorAll('.tiny-morph-svg,.tiny-restored-caret').forEach(el=>el.remove());
            });
            
            
            
            bringRealTinyToShare();
            shareTiny.classList.remove('share-tiny-look');
            shareTinyTimeout = setTimeout(() => {
                if (activeWish !== 'share' || shareFuelStarted) return;
                shareTiny.classList.add('share-tiny-look');
                shareTinyTimeout = setTimeout(() => {
                    if (activeWish !== 'share' || shareFuelStarted) return;
                    shareTiny.classList.remove('share-tiny-look');
                    scheduleTinyLookAtAgree(); 
                }, 1350);
            }, 1050 + 1200);
            scheduleShareTinyBlink();
        }


        
        
        const tinyRealityScene=document.getElementById('tiny-reality-scene');
        const tinyRealityHost=document.getElementById('tiny-reality-eye-host');
        const realitySparkField=document.getElementById('reality-spark-field');
        let tinyRealityStarted=false;
        function seedRealitySparks(){
            if(realitySparkField.childElementCount)return;
            const colors=['#ffd2e8','#ffb2d2','#ffe4ba','#e3c6ff','#ffadc9'];
            const particleCount = TINY_PERF.mobile ? 24 : 37;
            const heartEvery = TINY_PERF.mobile ? 4 : 5;
            for(let i=0;i<particleCount;i++){
                const isHeart = i % heartEvery === 0;
                const sp=document.createElement('span');
                sp.className='reality-particle'+(isHeart?' is-heart':'');
                if(isHeart)sp.textContent='♥';
                sp.style.setProperty('--px',(5+Math.random()*90)+'%');
                sp.style.setProperty('--py',(7+Math.random()*82)+'%');
                sp.style.setProperty('--ps',((isHeart?14:2)+Math.random()*(isHeart?13:3))+'px');
                sp.style.setProperty('--pc',colors[i%colors.length]);
                sp.style.setProperty('--pd',(3.2+Math.random()*4.5)+'s');
                sp.style.setProperty('--pdelay',(-Math.random()*7)+'s');
                realitySparkField.appendChild(sp);
            }
        }

        function seedRealityHeartRain(){
            const rain=document.getElementById('reality-heart-rain');
            const rise=document.getElementById('reality-heart-rise');
            if(!rain||rain.childElementCount)return;
            const palette=['#ff9ec7','#ffb3d4','#ff7fb0','#ffc7e2','#ff8fb8','#f9a8d4'];
            const nRain=TINY_PERF.mobile?15:27;
            for(let i=0;i<nRain;i++){
                const far=i%3===0;
                const el=document.createElementNS('http://www.w3.org/2000/svg','svg');
                el.setAttribute('viewBox','0 0 24 24');
                el.classList.add('rhr');
                if(far)el.classList.add('far');
                el.style.setProperty('--x',(Math.random()*100).toFixed(2)+'%');
                el.style.setProperty('--s',(far?8+Math.random()*8:13+Math.random()*17).toFixed(1)+'px');
                el.style.setProperty('--d',(9+Math.random()*9).toFixed(2)+'s');
                el.style.setProperty('--delay',(-Math.random()*17).toFixed(2)+'s');
                el.style.setProperty('--sway',(Math.random()*12-6).toFixed(2)+'vw');
                el.style.setProperty('--rot',(Math.random()*46-23).toFixed(0)+'deg');
                el.style.setProperty('--o',(far?(.3+Math.random()*.22):(.5+Math.random()*.38)).toFixed(2));
                el.style.color=palette[i%palette.length];
                el.innerHTML='<use href="#realityHeartPath"></use>';
                rain.appendChild(el);
            }
            if(rise&&!rise.childElementCount){
                const nRise=TINY_PERF.mobile?5:9;
                for(let i=0;i<nRise;i++){
                    const el=document.createElementNS('http://www.w3.org/2000/svg','svg');
                    el.setAttribute('viewBox','0 0 24 24');
                    el.classList.add('rhr2');
                    el.style.setProperty('--x',(Math.random()*100).toFixed(2)+'%');
                    el.style.setProperty('--s',(22+Math.random()*40).toFixed(1)+'px');
                    el.style.setProperty('--d',(13+Math.random()*10).toFixed(2)+'s');
                    el.style.setProperty('--delay',(-Math.random()*21).toFixed(2)+'s');
                    el.style.setProperty('--dx',(Math.random()*12-6).toFixed(2)+'vw');
                    el.style.setProperty('--bl',(2+Math.random()*4.2).toFixed(1)+'px');
                    el.style.setProperty('--o',(.2+Math.random()*.26).toFixed(2));
                    el.style.color=palette[(i+2)%palette.length];
                    el.innerHTML='<use href="#realityHeartPath"></use>';
                    rise.appendChild(el);
                }
            }
        }
         
         
         
         function prepareApproachingTinyEyes() {
             const SVGNS='http://www.w3.org/2000/svg';
             
             
             
             const shapeAt=t=>{
                 const n=4.35-0.35*t;       
                 const radius=50+4*t;     
                 const power=2/n;
                 const count=TINY_PERF.mobile?48:80;
                 let d='';
                 for(let i=0;i<count;i++){
                     const a=-Math.PI/2+i*2*Math.PI/count;
                     const x=Math.cos(a), y=Math.sin(a);
                     const px=50+radius*Math.sign(x)*Math.pow(Math.abs(x),power);
                     const py=50+radius*Math.sign(y)*Math.pow(Math.abs(y),power);
                     d+=(i?' L ':'M ')+px.toFixed(3)+' '+py.toFixed(3);
                 }
                 return d+' Z';
             };
             const start=shapeAt(0);
              
              const cachedPaths=TINY_PERF.mobile ? Array.from({length:37},(_,i)=>shapeAt(i/36)) : null;
             const eyes=Array.from(matElements).map((eye,index)=>{
                 eye.querySelectorAll('.reality-one-piece-svg').forEach(el=>el.remove());
                 const svg=document.createElementNS(SVGNS,'svg');
                 svg.classList.add('reality-one-piece-svg');
                 svg.setAttribute('viewBox','0 0 100 100');
                 svg.setAttribute('aria-hidden','true');
                 svg.innerHTML=`<defs>
                     <radialGradient id="reality-cyan-${index}" cx="31%" cy="19%" r="100%">
                         <stop offset="0%" stop-color="#fbbada"/>
                         <stop offset="40%" stop-color="#f674b0"/>
                         <stop offset="78%" stop-color="#f23090"/>
                         <stop offset="100%" stop-color="#e351a4"/>
                     </radialGradient>
                     <clipPath id="reality-bulge-clip-${index}"><path d="${start}"/></clipPath>
                 </defs>
                 <path class="reality-one-piece-body" d="${start}" fill="url(#reality-cyan-${index})"/>
                 <g class="reality-one-piece-reflections" clip-path="url(#reality-bulge-clip-${index})">
                     <ellipse class="main-glint" cx="35" cy="32" rx="15" ry="17"/>
                     <circle class="tiny-glint" cx="76" cy="75" r="7.7"/>
                     <circle class="tiny-glint" cx="69" cy="85" r="2.7" opacity=".9"/>
                     <path class="love-glint" d="M50 67 C 40.5 59 31 51.5 31 43 C 31 36.6 36 33.5 40.2 33.5 C 43.8 33.5 47.3 35.5 50 39.2 C 52.7 35.5 56.2 33.5 59.8 33.5 C 64 33.5 69 36.6 69 43 C 69 51.5 59.5 59 50 67 Z"/>
                 </g>`;
                 eye.appendChild(svg);
                 eye.classList.add('reality-morphing');
                 return {shape:svg.querySelector('.reality-one-piece-body'),clip:svg.querySelector('clipPath path'),glints:svg.querySelector('.reality-one-piece-reflections')};
             });
             const smooth=t=>t*t*(3-2*t);
             const draw=progress=>{
                 const t=smooth(Math.max(0,Math.min(1,progress)));
                  const d=cachedPaths ? cachedPaths[Math.min(36,Math.round(t*36))] : shapeAt(t);
                 for (const eye of eyes) {
                     eye.shape.setAttribute('d',d);
                     eye.clip.setAttribute('d',d);
                     eye.glints.style.opacity=String(smooth(Math.max(0,Math.min(1,(progress-.2)/.65))));
                 }
             };
             draw(0);
             return draw;
         }

        function beginTinyRealityScene(){
            budgetSceneTransition(1450);
            if(tinyRealityStarted)return;
            tinyRealityStarted=true;
            activeWish='reality';
             if (TINY_PERF.mobile) {
                 document.documentElement.classList.add('tiny-v9-reality-enter');
                 setTimeout(()=>document.documentElement.classList.remove('tiny-v9-reality-enter'),1600);
             }
            clearTimeout(shareTinyTimeout); clearTimeout(shareTinyBlinkTimeout);
            const previous=khungMat.getBoundingClientRect();
            shareTiny.classList.remove('share-tiny-cheer','share-tiny-look','share-tiny-blink','share-tiny-thank-glow','tiny-folding-smile');
            matElements.forEach(eye=>eye.querySelectorAll('.tiny-folding-smile-svg,.tiny-restored-caret').forEach(el=>el.remove()));
            
            matElements.forEach(eye=>{
                eye.classList.remove('tiny-actual-morph','nham','wish-wink','wish-blink');
                eye.querySelectorAll('.tiny-morph-svg').forEach(svg=>svg.remove());
                eye.style.removeProperty('transform');
                eye.style.removeProperty('background');
            });
            khungMat.querySelectorAll('.truc-x').forEach(eye=>{
                eye.style.transform='';eye.style.animation='';
            });
            tinyRealityScene.classList.add('reality-visible');
            setTimeout(()=>{if(activeWish==='reality'){seedRealitySparks();seedRealityHeartRain();}}, TINY_PERF.mobile?1850:1710);
            tinyRealityScene.setAttribute('aria-hidden','false');
            tinyRealityHost.appendChild(khungMat); 
            const next=khungMat.getBoundingClientRect();
            const dx=previous.left+previous.width/2-next.left-next.width/2;
            const dy=previous.top+previous.height/2-next.top-next.height/2;
            const sx=previous.width/Math.max(next.width,1);
            const sy=previous.height/Math.max(next.height,1);
             
             const drawApproachEyes=prepareApproachingTinyEyes();
             const FLY_MS=1650;
             const fly=khungMat.animate([
                 {transform:`translate(${dx.toFixed(1)}px,${dy.toFixed(1)}px) scale(${sx.toFixed(3)},${sy.toFixed(3)})`},
                 {transform:'translate(0px,0px) scale(1,1)'}
             ],{duration:FLY_MS,easing:'cubic-bezier(.15,.76,.22,1)',fill:'none'});
             shareFlightScene.classList.add('reality-leaving');
             const morphStart=performance.now();
             let morphDone=false;
             const animateMorph=now=>{
                 if(morphDone)return;
                 const progress=Math.min(1,(now-morphStart)/FLY_MS);
                  if (!TINY_PERF.mobile || !animateMorph.last || now-animateMorph.last >= 30 || progress >= 1) {
                     drawApproachEyes(progress);
                      animateMorph.last=now;
                  }
                 if(progress<1)requestAnimationFrame(animateMorph);
                 else morphDone=true;
             };
             requestAnimationFrame(animateMorph);
             let sceneDone=false;
             const convert=()=>{
                 if(sceneDone)return;
                 sceneDone=true;
                 morphDone=true;
                 drawApproachEyes(1);
                 tinyRealityHost.classList.add('cute-ready');
                 tinyRealityScene.classList.add('reality-cute');
             };
             fly.onfinish=convert;
             
             setTimeout(convert,FLY_MS+180);
        }

        
        
        
        function launchSharePlane() {
            if (!sharePlaneReady || sharePlaneLaunched || activeWish !== 'share') return;
            sharePlaneLaunched = true;
            sharePlaneReady = false;
            shareAirplaneStand.classList.remove('share-ready');
            
            const startRect = shareAirplaneStand.getBoundingClientRect();
            Object.assign(shareAirplaneStand.style, {
                position: 'fixed', left: startRect.left + 'px', top: startRect.top + 'px',
                width: startRect.width + 'px', height: startRect.height + 'px',
                right: 'auto', bottom: 'auto', maxWidth: 'none', zIndex: '95',
                pointerEvents: 'none'
            });
            document.body.appendChild(shareAirplaneStand);
            shareAirplaneStand.classList.add('share-takeoff');
            shareFlightStatus.textContent = 'Máy bay đang cất cánh ✈';
            
            
            shareAirplane.classList.add('share-flying');
            if (TINY_PERF.mobile) requestAnimationFrame(()=>beginTinyRealityScene());
            else beginTinyRealityScene();
            let didFinish = false;
            const onDepartEnd = event => {
                if (event.target === shareAirplane && event.animationName === 'sharePlaneDepart') finish();
            };
            const finish = () => {
                if (didFinish) return;
                didFinish = true;
                shareAirplane.removeEventListener('animationend', onDepartEnd);
                shareAirplaneStand.remove();
            };
            shareAirplane.addEventListener('animationend', onDepartEnd);
            setTimeout(finish, 1660); 
        }
        
        function fallbackCopyShareUrl() {
            const field = document.createElement('textarea');
            field.value = SHARE_FLIGHT_URL;
            field.setAttribute('readonly','');
            field.style.cssText = 'position:fixed;left:-200vw;top:0;opacity:0;';
            document.body.appendChild(field);
            field.focus();field.select();field.setSelectionRange(0,field.value.length);
            let ok = false;
            try { ok = document.execCommand('copy'); } catch (_) {}
            field.remove();
            return ok;
        }
        async function copyShareUrl() {
            if (!SHARE_FLIGHT_URL) return true; 
            if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
                try { await navigator.clipboard.writeText(SHARE_FLIGHT_URL); return true; }
                catch (_) { return fallbackCopyShareUrl(); }
            }
            return fallbackCopyShareUrl();
        }
        shareFuelButton.addEventListener('click', function (event) {
            event.stopPropagation();
            event.preventDefault();
            if (shareFuelStarted || activeWish !== 'share') return;
            shareFuelStarted = true;
            syncShareFuelHose();
            clearTimeout(shareTinyTimeout);
            clearTimeout(shareTinyBlinkTimeout);
            shareTiny.classList.remove('share-tiny-look','share-tiny-blink','share-tiny-cheer');
            
            
            shareTiny.classList.remove('share-tiny-thank-glow');
            matElements.forEach(eye => {
                eye.classList.remove('tiny-actual-morph');
                eye.querySelectorAll('.tiny-morph-svg').forEach(svg => svg.remove());
            });
            
            shareFlightScene.classList.add('share-thank-you');
            const thanks = shareFlightScene.querySelector('.share-heading-thanks');
            const original = shareFlightScene.querySelector('.share-heading-original');
            if(thanks)thanks.setAttribute('aria-hidden','false');
            if(original)original.setAttribute('aria-hidden','true');
            
            const clipboardResult = copyShareUrl();
            let copySucceeded = null;
            shareFuelButton.disabled = true;
            shareFlightStatus.textContent = 'Đang bơm nhiên liệu...';
            shareFlightDevice.classList.add('share-flight-scene-pumping');
            sharePipeDrops.setAttribute('opacity','1');
            const drops = [...sharePipeDrops.querySelectorAll('circle')];
            let length = 0;
            try { length = sharePipePath.getTotalLength(); } catch (_) {}
            const duration = 1800;
            const startTime = performance.now();
            const easing = t => t*t*(3-2*t);
            const animateFuel = now => {
                if (activeWish !== 'share') return;
                const t = Math.max(0,Math.min(1,(now-startTime)/duration));
                const pct = 80 - 75 * easing(t);
                shareFuelLiquid.style.setProperty('--fuel-remaining',pct.toFixed(1)+'%');
                shareFuelMeter.textContent = Math.round(pct)+'%';
                syncFuelEatenText();
                if(length) {
                    drops.forEach((dot,i) => {
                        const phase = ((now-startTime)/430 + i/3)%1;
                        const p=sharePipePath.getPointAtLength(phase*length);
                        dot.setAttribute('cx',p.x.toFixed(1)); dot.setAttribute('cy',p.y.toFixed(1));
                    });
                }
                if (t<1) requestAnimationFrame(animateFuel);
                else {
                    sharePipeDrops.setAttribute('opacity','0');
                    shareFlightDevice.classList.remove('share-flight-scene-pumping');
                    
                    sharePlaneReady=true;
                    shareFlightStatus.textContent = 'Đã nạp đầy năng lượng! ✈';
                    launchSharePlane();
                }
            };
            requestAnimationFrame(animateFuel);
            clipboardResult.then(ok => {
                copySucceeded = ok;
                notifyShareCopy(ok); 
                if (!ok) {
                    shareManualLink.style.display = 'block';
                    shareFlightStatus.textContent='Trình duyệt chặn sao chép tự động.';
                }
            });
        });

        
        
        const tinyIsControl = target => target instanceof Element &&
            !!target.closest('a, button, input, textarea, select, summary, [role="button"], [contenteditable="true"]');
        document.addEventListener('click', function(event) {
            if (tinyIsControl(event.target)) return;
            if (document.getElementById('shop-product-modal')?.classList.contains('show')) return;
            chuyenCanh();
        });

        function khoiDongLaVang() {
            const ctx = laCanvas.getContext('2d');
            let w = 0, h = 0;
            function resize() {
                const nextW=laCanvas.clientWidth, nextH=laCanvas.clientHeight;
                if (TINY_PERF.mobile && nextW===w && nextH===h) return;
                const mobileCanvas = window.innerWidth <= 600;
                const dpr = TINY_PERF.mobile ? TINY_PERF.canvasDpr(nextW,nextH,1.4) : Math.min(window.devicePixelRatio || 1, mobileCanvas ? 1.15 : 1.4);
                w = nextW; h = nextH;
                laCanvas.width = Math.max(1, Math.round(w * dpr));
                laCanvas.height = Math.max(1, Math.round(h * dpr));
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            }
            resize();
            window.addEventListener('resize', resize);

            function taoLa(mau) {
                const c = document.createElement('canvas');
                c.width = 60; c.height = 40;
                const x = c.getContext('2d');
                x.shadowBlur = 6; x.shadowColor = 'rgba(255, 190, 0, 0.7)';
                x.fillStyle = mau;
                x.beginPath();
                x.moveTo(6, 20);
                x.bezierCurveTo(18, 2, 44, 3, 55, 20);
                x.bezierCurveTo(44, 37, 18, 38, 6, 20);
                x.fill();
                x.shadowBlur = 0;
                x.strokeStyle = 'rgba(130, 75, 0, 0.55)';
                x.lineWidth = 1.2;
                x.beginPath(); x.moveTo(2, 20); x.lineTo(50, 20); x.stroke();
                for (let i = 0; i < 3; i++) {
                    const px = 16 + i * 12;
                    x.beginPath(); x.moveTo(px, 20); x.lineTo(px + 7, 11); x.moveTo(px, 20); x.lineTo(px + 7, 29); x.stroke();
                }
                return c;
            }
            function taoCanhHoa() {
                const c = document.createElement('canvas');
                c.width = 40; c.height = 40;
                const x = c.getContext('2d');
                x.shadowBlur = 6; x.shadowColor = 'rgba(255, 190, 0, 0.8)';
                x.fillStyle = 'rgba(255, 228, 120, 0.95)';
                x.beginPath();
                x.moveTo(20, 20);
                x.bezierCurveTo(30, 10, 30, 30, 20, 40);
                x.bezierCurveTo(10, 30, 10, 10, 20, 20);
                x.fill();
                return c;
            }
            const sprites = [
                taoLa('#ffd23f'), taoLa('#f5b700'), taoLa('#e8a317'), taoLa('#ffe066'), taoLa('#d98c00'),
                taoCanhHoa(), taoCanhHoa()
            ];

            const mobile = window.innerWidth <= 600;
            const soLuong = TINY_PERF.mobile ? 10 : mobile ? 27 : 52; 
            const hat = [];

            function datLai(p, taiSinh) {
                p.sprite = sprites[Math.floor(Math.random() * sprites.length)];
                p.size = Math.random() * 0.45 + 0.45;
                p.vy = Math.random() * 0.7 + 0.48;
                
                p.vx = -(Math.random() * 1.75 + 1.35);
                p.lechX = Math.random() * 0.9 + 0.8;
                p.lechY = Math.random() * 0.35 + 0.12;
                p.gocXoay = Math.random() * Math.PI * 2;
                p.tocDoXoay = Math.random() * 0.035 - 0.0175;
                p.lat = Math.random() * Math.PI * 2;
                p.tocDoLat = Math.random() * 0.05 + 0.02;
                p.lac = Math.random() * Math.PI * 2;
                p.alpha = Math.random() * 0.3 + 0.65;
                if (!taiSinh) {
                    
                    p.x = Math.random() * (w + 40);
                    p.y = Math.random() * h;
                } else if (Math.random() < 0.72) {
                    
                    p.x = w + 80 + Math.random() * 150;
                    p.y = Math.random() * h * 0.84;
                } else {
                    
                    p.x = Math.random() * (w + 120);
                    p.y = -55 - Math.random() * 90;
                }
            }
            for (let i = 0; i < soLuong; i++) { const p = {}; datLai(p, false); hat.push(p); }

            const buocKhung = 1000 / TINY_PERF.leafFps;
            let khungTruoc = 0, raf = 0, frameTimer = 0;
            function schedule() {
                if (raf || frameTimer || document.hidden || dungVeLaVang) return;
                const delay=khungTruoc
                    ? Math.max(0,buocKhung-1000/60-(performance.now()-khungTruoc))
                    : 0;
                if (delay>1) {
                    frameTimer=setTimeout(() => {
                        frameTimer=0;
                        if (!document.hidden && !dungVeLaVang && !raf) raf=requestAnimationFrame(vong);
                    },delay);
                } else {
                    raf=requestAnimationFrame(vong);
                }
            }
            function vong(thoiGian) {
                raf=0;
                if (dungVeLaVang) {
                    clearTimeout(frameTimer); frameTimer=0;
                    ctx.clearRect(0, 0, w, h);
                    return; 
                }
                if (document.hidden) return;
                if (!TINY_PERF.mobile && document.documentElement.classList.contains('tiny-scene-transition')) {
                    khungTruoc=thoiGian;schedule();return;
                }
                if (khungTruoc && thoiGian - khungTruoc < buocKhung) {
                    schedule();
                    return;
                }
                const heSo = khungTruoc ? Math.min(2.5, (thoiGian - khungTruoc) / (1000 / 60)) : 1;
                khungTruoc = thoiGian;
                ctx.clearRect(0, 0, w, h);
                for (const p of hat) {
                    p.lac += 0.026 * heSo;
                    p.y += (p.vy + Math.sin(p.lac * 0.9) * p.lechY) * heSo;
                    p.x += (p.vx + Math.sin(p.lac) * p.lechX) * heSo;
                    p.gocXoay += p.tocDoXoay * heSo;
                    p.lat += p.tocDoLat * heSo;
                    if (p.y > h + 60 || p.x < -160) datLai(p, true);
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.gocXoay);
                    ctx.scale(p.size * (0.3 + 0.7 * Math.abs(Math.cos(p.lat))), p.size);
                    ctx.globalAlpha = TINY_PERF.mobile ? p.alpha * Math.min(1, Math.max(0, p.x / (w * 0.3))) : p.alpha;
                    ctx.drawImage(p.sprite, -p.sprite.width / 2, -p.sprite.height / 2);
                    ctx.restore();
                }
                schedule();
            }
            document.addEventListener('visibilitychange', () => {
                if (!document.hidden) {
                    if (dungVeLaVang) {
                        ctx.clearRect(0, 0, w, h);
                        return;
                    }
                    khungTruoc=0;
                    schedule();
                }
            });
            schedule();
        }

        
        const moiSvg = moiRobot.querySelector('svg');
        const HUONG_LIEC = [[-1, 0], [1, 0]]; 
        let dangLiec = false, henLiec = null, huongCu = -1;

        function datTamNhin(dx, dy, bx, giay, nhip) {
            trucXElements.forEach(tx => {
                tx.style.transition = 'transform ' + giay + 's ' + nhip;
                tx.style.transform = 'translate(' + dx + 'px, ' + dy + 'px)';
            });
            moiSvg.style.transition = 'transform ' + giay + 's ' + nhip;
            moiSvg.style.transform = 'translate(' + (dx * 0.4) + 'px, ' + (dy * 0.4) + 'px) rotate(' + (bx ? dx / bx * 7 : 0) + 'deg)';
        }
        function lietTiep() {
            if (!dangLiec) return;
            const mobile = window.innerWidth <= 600;
            const bx = mobile ? 30 : 56, by = mobile ? 20 : 32;
            if (Math.random() < 0.15) {
                datTamNhin(0, 0, bx, 0.45, 'cubic-bezier(0.3, 0, 0.2, 1)');   
                huongCu = -1;
            } else {
                let i;
                do { i = Math.floor(Math.random() * HUONG_LIEC.length); } while (i === huongCu);
                huongCu = i;
                const h = HUONG_LIEC[i];
                const dx = Math.round(h[0] * bx * (0.75 + Math.random() * 0.25));
                const dy = Math.round(h[1] * by * (0.75 + Math.random() * 0.25));
                datTamNhin(dx, dy, bx, 0.45, 'cubic-bezier(0.3, 0, 0.2, 1)');
            }
            henLiec = setTimeout(lietTiep, 1100 + Math.random() * 1300);
        }
        function batDauLiec() {
            if (dangLiec) return;
            dangLiec = true;
            lietTiep();
        }
        function dungLiec(veGiua) {
            dangLiec = false;
            clearTimeout(henLiec);
            if (veGiua !== false) datTamNhin(0, 0, 0, 1.5, 'cubic-bezier(0.2, 0.8, 0.2, 1)');
            else {   
                moiSvg.style.transition = 'transform 1.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
                moiSvg.style.transform = 'translate(0px, 0px) rotate(0deg)';
            }
        }

        function kichHoatChuKyChop() {
            if (ngungChopTuDong) return;
            matElements.forEach(m => m.classList.add('nham'));
            setTimeout(() => {
                if (!ngungChopTuDong) matElements.forEach(m => m.classList.remove('nham'));
            }, 150);
            const thoiGianCho = Math.random() * 2000 + 2000;
            setTimeout(() => {
                if (!ngungChopTuDong) kichHoatChuKyChop();
            }, thoiGianCho);
        }

        function khoiDongMuaHoa() {
            const ctx = natureCanvas.getContext('2d');
            let w = window.innerWidth, h = window.innerHeight;
            function sizeNatureCanvas(){
                w=window.innerWidth; h=window.innerHeight;
                const r=TINY_PERF.mobile ? TINY_PERF.canvasDpr(w,h,1) : 1;
                natureCanvas.width=Math.max(1,Math.round(w*r));
                natureCanvas.height=Math.max(1,Math.round(h*r));
                ctx.setTransform(r,0,0,r,0,0);
            }
            sizeNatureCanvas();
            
            const petalCanvas = document.createElement('canvas');
            petalCanvas.width = 40;
            petalCanvas.height = 40;
            const pctx = petalCanvas.getContext('2d');
            pctx.shadowBlur = 5;
            pctx.shadowColor = 'rgba(255, 20, 147, 0.8)';
            pctx.fillStyle = 'rgba(255, 105, 180, 0.9)';
            pctx.beginPath();
            pctx.moveTo(20, 20);
            pctx.bezierCurveTo(30, 10, 30, 30, 20, 40);
            pctx.bezierCurveTo(10, 30, 10, 10, 20, 20);
            pctx.fill();

            window.addEventListener('resize', () => {
                if (TINY_PERF.mobile && window.innerWidth === w && window.innerHeight === h) return;
                sizeNatureCanvas();
            }, {passive:true});

            const particles = [];
            const soLuongHoa = TINY_PERF.mobile ? 8 : window.innerWidth <= 600 ? 55 : 100; 

            class CanhHoa {
                constructor() {
                    this.khoiTao();
                    this.x = Math.random() * w;
                    this.y = Math.random() * h;
                    this.dangRoi = true; 
                }
                
                khoiTao() {
                    this.size = Math.random() * 0.5 + 0.3; 
                    this.tocDoX = Math.random() * 1.5 + 0.8; 
                    this.tocDoY = Math.random() * 1.5 + 0.8; 
                    this.gocXoay = Math.random() * Math.PI * 2;
                    this.tocDoXoay = Math.random() * 0.02 - 0.01;
                    this.alpha = Math.random() * 0.5 + 0.3;
                    this.dangRoi = true;
                }

                update(step = 1) {
                    if (!this.dangRoi) return;
                    this.y += this.tocDoY*step;
                    this.x += (this.tocDoX + Math.sin(this.gocXoay) * 1.5)*step;
                    this.gocXoay += this.tocDoXoay*step;

                    if (this.y > h + 30 || this.x > w + 30) {
                        if (dungRoiHoa) {
                            this.dangRoi = false;
                        } else {
                            this.khoiTao();
                            if (Math.random() > 0.5) {
                                this.x = Math.random() * w - w/2; 
                                this.y = -30;
                            } else {
                                this.x = -30;
                                this.y = Math.random() * h;
                            }
                        }
                    }
                }

                draw() {
                    if (!this.dangRoi) return;
                    ctx.save();
                    ctx.translate(this.x, this.y);
                    ctx.rotate(this.gocXoay);
                    ctx.scale(this.size, this.size);
                    ctx.globalAlpha = this.alpha;
                    ctx.drawImage(petalCanvas, -20, -20);
                    ctx.restore();
                }
            }

            for (let i = 0; i < soLuongHoa; i++) {
                particles.push(new CanhHoa());
            }

            const nhipHoa = 1000 / TINY_PERF.ambientFps;
            let lanTruoc = 0, raf = 0, frameTimer = 0;
            function schedule() {
                if (raf || frameTimer || document.hidden || dungVeHoaHong) return;
                const delay=lanTruoc
                    ? Math.max(0,nhipHoa-1000/60-(performance.now()-lanTruoc))
                    : 0;
                if (delay>1) {
                    frameTimer=setTimeout(() => {
                        frameTimer=0;
                        if (!document.hidden && !dungVeHoaHong && !raf) raf=requestAnimationFrame(animationLoop);
                    },delay);
                } else {
                    raf=requestAnimationFrame(animationLoop);
                }
            }
            function animationLoop(t) {
                raf=0;
                if (dungVeHoaHong) {
                    clearTimeout(frameTimer); frameTimer=0;
                    ctx.clearRect(0, 0, w, h);
                    return;
                }
                if (document.hidden) return;
                if ((!TINY_PERF.mobile && document.documentElement.classList.contains('tiny-scene-transition')) || (lanTruoc && t - lanTruoc < nhipHoa)) {
                    schedule();
                    return;
                }
                const step = TINY_PERF.mobile ? Math.min(2.2, Math.max(.35, lanTruoc ? (t-lanTruoc)/16.6667 : 1)) : 1;
                lanTruoc = t;
                ctx.clearRect(0, 0, w, h);
                particles.forEach(p => {
                    p.update(step);
                    p.draw();
                });
                schedule();
            }
            document.addEventListener('visibilitychange', () => {
                if (!document.hidden) {
                    if (dungVeHoaHong) {
                        ctx.clearRect(0, 0, w, h);
                        return;
                    }
                    lanTruoc=0;
                    schedule();
                }
            });
            schedule();
        }

        
        const coHoa = document.getElementById('co-hoa');
        const SVGNS = 'http://www.w3.org/2000/svg';
        const rnd = (a, b) => a + Math.random() * (b - a);
        const chon = (arr) => arr[Math.floor(Math.random() * arr.length)];

        const MAU_XANH = ['#5cf0a0', '#8be04e', '#2fd4b4', '#b4f03c', '#ea73b7'];
        const MAU_HOA  = ['#ff6fae', '#ff4f84', '#df8dfa', '#f77cd6', '#ff9a4d', '#ffffff', '#ff8fd0'];
        const MAU_TAM  = ['#ffffff', '#ff9a4d', '#e263f8'];
        let mau = '#ffffff';   

        function el(tag, attrs, parent) {
            const e = document.createElementNS(SVGNS, tag);
            for (const k in attrs) e.setAttribute(k, attrs[k]);
            if (parent) parent.appendChild(e);
            return e;
        }
        function net(parent, d, delay) {
            const p = el('path', { d: d, class: 'net', pathLength: 1 }, parent);
            p.style.setProperty('--d', delay.toFixed(2) + 's');
            p.style.setProperty('--mau', mau);
            return p;
        }
        function nhomLac(parent, ox, oy, amp, t, dl) {
            const g = el('g', { class: 'lac' }, parent);
            g.style.transformOrigin = ox + 'px ' + oy + 'px';
            g.style.setProperty('--a', amp.toFixed(2) + 'deg');
            g.style.animationDuration = t + 's';
            g.style.animationDelay = dl.toFixed(2) + 's';
            return g;
        }
        function qp(p0, p1, p2, t) {
            const u = 1 - t;
            return {
                x: u * u * p0.x + 2 * u * t * p1.x + t * t * p2.x,
                y: u * u * p0.y + 2 * u * t * p1.y + t * t * p2.y,
                ang: Math.atan2(2 * u * (p1.y - p0.y) + 2 * t * (p2.y - p1.y),
                                2 * u * (p1.x - p0.x) + 2 * t * (p2.x - p1.x)) * 180 / Math.PI
            };
        }
        function vongTron(parent, cx, cy, r, delay) {
            return net(parent, `M ${cx - r} ${cy} a ${r} ${r} 0 1 0 ${2 * r} 0 a ${r} ${r} 0 1 0 ${-2 * r} 0`, delay);
        }
        function chiLa(parent, x, y, goc, dai, rong, delay) {
            const g = el('g', { transform: `translate(${x} ${y}) rotate(${goc})` }, parent);
            net(g, `M 0 0 Q ${dai * 0.5} ${-rong} ${dai} 0 Q ${dai * 0.5} ${rong} 0 0`, delay);
            net(g, `M 0 0 L ${dai * 0.88} 0`, delay + 0.15);
            for (let k = 1; k <= 3; k++) {
                const px = dai * (0.15 + k * 0.2);
                const dy = rong * 0.55 * (1 - k * 0.2);
                net(g, `M ${px} 0 L ${px + dai * 0.1} ${-dy} M ${px} 0 L ${px + dai * 0.1} ${dy}`, delay + 0.2);
            }
        }
        function hoaCuc(parent, cx, cy, R, delay, mauCanh, mauTam) {
            const g = el('g', { transform: `translate(${cx} ${cy}) rotate(${rnd(-25, 25)})` }, parent);
            const n = Math.round(rnd(8, 12)), r0 = R * 0.26, pw = R * 0.24;
            mau = mauCanh;
            for (let i = 0; i < n; i++) {
                const pg = el('g', { transform: `rotate(${i * 360 / n})` }, g);
                net(pg, `M ${r0} 0 Q ${(r0 + R) / 2} ${-pw} ${R} 0 Q ${(r0 + R) / 2} ${pw} ${r0} 0`, delay + i * 0.03);
            }
            mau = mauTam;
            vongTron(g, 0, 0, r0, delay + 0.1);
            vongTron(g, 0, 0, r0 * 0.45, delay + 0.2);
        }
        function hoaSen(parent, cx, cy, R, delay, mauCanh) {
            const g = el('g', { transform: `translate(${cx} ${cy}) rotate(${rnd(-12, 12)})` }, parent);
            const lop = [{ n: 7, len: R, sp: 150 }, { n: 5, len: R * 0.72, sp: 110 }];
            lop.forEach((L, li) => {
                mau = li === 0 ? mauCanh : '#ffffff';
                for (let i = 0; i < L.n; i++) {
                    const a = -90 + (i / (L.n - 1) - 0.5) * L.sp;
                    const pg = el('g', { transform: `rotate(${a})` }, g);
                    net(pg, `M 0 0 Q ${L.len * 0.4} ${-L.len * 0.4} ${L.len} 0 Q ${L.len * 0.4} ${L.len * 0.4} 0 0`, delay + li * 0.2 + i * 0.04);
                }
            });
        }
        function hoaNam(parent, cx, cy, R, delay, mauCanh, mauTam) {
            const g = el('g', { transform: `translate(${cx} ${cy}) rotate(${rnd(0, 72)})` }, parent);
            mau = mauCanh;
            for (let i = 0; i < 5; i++) {
                const pg = el('g', { transform: `rotate(${i * 72})` }, g);
                net(pg, `M 0 0 C ${R * 0.2} ${-R * 0.55} ${R * 0.8} ${-R * 0.55} ${R * 0.85} 0 C ${R * 0.8} ${R * 0.55} ${R * 0.2} ${R * 0.55} 0 0`, delay + i * 0.05);
            }
            mau = mauTam;
            vongTron(g, 0, 0, R * 0.16, delay + 0.2);
        }
        function cayHoa(parent, x, goc, h, kieu, delay, W) {
            const bend = rnd(-0.2, 0.08) * h;
            const p0 = { x: x, y: goc }, p1 = { x: x + bend * 1.6, y: goc - h * 0.55 }, p2 = { x: x + bend, y: goc - h };
            const g = nhomLac(parent, x, goc, rnd(1.2, 2.6), 3.4, -(x / W) * 3 - rnd(0, 0.4));
            mau = chon(MAU_XANH);
            net(g, `M ${p0.x} ${p0.y} Q ${p1.x} ${p1.y} ${p2.x} ${p2.y}`, delay);
            [0.28, 0.48, 0.66].forEach((t, i) => {
                const q = qp(p0, p1, p2, t);
                const dai = Math.max(16, Math.min(46, h * 0.17));
                mau = chon(MAU_XANH);
                chiLa(g, q.x, q.y, q.ang + (i % 2 ? 1 : -1) * rnd(35, 55), dai, dai * 0.3, delay + 0.3 + i * 0.15);
            });
            const R = Math.max(11, Math.min(24, h * 0.085));
            const mc = chon(MAU_HOA), mt = chon(MAU_TAM);
            if (kieu === 0) hoaCuc(g, p2.x, p2.y, R, delay + 0.8, mc, mt);
            else if (kieu === 1) hoaSen(g, p2.x, p2.y, R * 1.35, delay + 0.8, mc);
            else hoaNam(g, p2.x, p2.y, R, delay + 0.8, mc, mt);
        }
        function canhLa(parent, x, goc, dx, dy, soLa, delay, W) {
            const p0 = { x: x, y: goc }, p1 = { x: x + dx * 0.1, y: goc - dy * 0.65 }, p2 = { x: x + dx, y: goc - dy };
            const g = nhomLac(parent, x, goc, rnd(1, 1.8), 4.2, -(x / W) * 3);
            mau = '#d9a066';
            net(g, `M ${p0.x} ${p0.y} Q ${p1.x} ${p1.y} ${p2.x} ${p2.y}`, delay);
            for (let i = 0; i < soLa; i++) {
                const t = 0.2 + 0.75 * i / (soLa - 1);
                const q = qp(p0, p1, p2, t);
                const dai = 46 - 24 * t;
                mau = chon(MAU_XANH);
                chiLa(g, q.x, q.y, q.ang + (i % 2 ? 1 : -1) * rnd(38, 55), dai, dai * 0.3, delay + 0.3 + i * 0.12);
            }
            const qe = qp(p0, p1, p2, 1);
            mau = chon(MAU_XANH);
            chiLa(g, qe.x, qe.y, qe.ang, 24, 7, delay + 1.6);
            hoaNam(g, p2.x + 4, p2.y - 8, 12, delay + 1.8, chon(MAU_HOA), '#ffffff');
        }

        function dungCoHoa() {
            const W = window.innerWidth;
            const mobile = W <= 600;
            
            const Hh = Math.round(Math.min(window.innerHeight * (mobile ? 0.41 : 0.44), mobile ? 330 : 430));
            
            coHoa.setAttribute('overflow', 'visible');
            coHoa.style.overflow = 'visible';
            coHoa.setAttribute('viewBox', `0 0 ${W} ${Hh}`);
            coHoa.setAttribute('width', W);
            coHoa.setAttribute('height', Hh);
            coHoa.innerHTML = '';
            coHoa.classList.toggle('xong', coHoa.classList.contains('hien-thi'));

            const base = Hh + 4;
            
            const imgH = anhHaiNguoi.getBoundingClientRect().height;
            const vungX = W - imgH * 0.634 - W * 0.02 - 20;

            
            const ph = rnd(0, 6);
            const nhomCo = new Map(MAU_XANH.map(m => [m, []]));
            for (let x = -10; x < W + 10; x += rnd(3.1, 6.2)) {
                let h = Hh * (0.22 + 0.42 * rnd(0.35, 1) * (0.65 + 0.35 * Math.sin(x / 85 + ph)));
                
                if (x > vungX) h *= 0.98;
                const lean = rnd(-0.3, 0.08) * h;
                const w = rnd(2.5, 6);
                const d = `M ${x - w} ${base} Q ${x - w + lean * .35} ${base - h * .55} ${x + lean} ${base - h} Q ${x + w + lean * .35} ${base - h * .5} ${x + w} ${base}`;
                nhomCo.get(chon(MAU_XANH)).push(d);
            }
            nhomCo.forEach((netCo, mauCo) => {
                el('path', { class: 'co-ngan', d: netCo.join(' '), stroke: mauCo }, coHoa);
            });

            
            canhLa(coHoa, W * 0.02, base, W * (mobile ? 0.26 : 0.15), Hh * 0.95, mobile ? 6 : 8, 0.6, W);
            if (!mobile) canhLa(coHoa, W * 0.32, base, W * 0.1, Hh * 0.8, 6, 1.0, W);

            
            const soHoa = mobile ? 5 : 9;
            const dau = W * 0.06, cuoi = Math.max(dau + 50, vungX - 30);
            for (let i = 0; i < soHoa; i++) {
                const x = dau + (cuoi - dau) * (i + rnd(0.2, 0.8)) / soHoa;
                cayHoa(coHoa, x, base, Hh * rnd(0.7, 1.0), i % 3, 0.8 + (x / W) * 1.5, W);
            }
            
            if (vungX < W - 40) {
                const soHoaChan = mobile ? 4 : 6;
                for (let i = 0; i < soHoaChan; i++) {
                    const x = Math.max(0, vungX) + (W - Math.max(0, vungX)) * (i + .5) / soHoaChan;
                    cayHoa(coHoa, x, base, Hh * rnd(.38, .66), i % 3, 1.4 + i * .14, W);
                }
            }
        }


        let rongCuoi = window.innerWidth, henGio;
        window.addEventListener('resize', () => {
            clearTimeout(henGio);
            henGio = setTimeout(() => {
                if (window.innerWidth !== rongCuoi) { rongCuoi = window.innerWidth; dungCoHoa(); }
            }, 300);
        });
        dungCoHoa();

/* ===== (không id) ===== */
(() => {
            const sky = document.getElementById('tiny-sky');
            for (let i = 0; i < (TINY_PERF.mobile ? 18 : TINY_PERF.lite ? 58 : 78); i++) {
                const star = document.createElement('span');
                star.className = 'tiny-star';
                star.style.left = (Math.random() * 100) + '%';
                star.style.top = (Math.random() * 75) + '%';
                star.style.setProperty('--size', (1 + Math.random() * 2) + 'px');
                star.style.setProperty('--twinkle', (1.4 + Math.random() * 3.2) + 's');
                star.style.setProperty('--delay', (-Math.random() * 5) + 's');
                sky.appendChild(star);
            }
            const lower = document.getElementById('lower-stars');
            for (let i = 0; i < (TINY_PERF.mobile ? 6 : 28); i++) {
                const star = document.createElement('span');
                star.className = 'lower-star';
                star.style.left = (Math.random() * 100) + '%';
                star.style.top = (76 + Math.random() * 20) + '%';
                star.style.setProperty('--size', (1 + Math.random() * 2.4) + 'px');
                star.style.setProperty('--twinkle', (1.5 + Math.random() * 3) + 's');
                star.style.setProperty('--delay', (-Math.random() * 5) + 's');
                lower.appendChild(star);
            }
            
            

            
            const meteors = [];
            function quyDaoSao(meteor) {
                const w = window.innerWidth, h = window.innerHeight;
                const dx = w * Number(meteor.dataset.flyX), dy = h * Number(meteor.dataset.flyY);
                const goc = Math.atan2(-dy, dx) * 180 / Math.PI;
                meteor.style.setProperty('--meteor-angle', goc.toFixed(1) + 'deg');
                for (const t of [8, 20, 36, 53, 100]) {
                    meteor.style.setProperty('--meteor-x' + String(t).padStart(2, '0'), (-dx * t / 100).toFixed(1) + 'px');
                    meteor.style.setProperty('--meteor-y' + String(t).padStart(2, '0'), (dy * t / 100).toFixed(1) + 'px');
                }
            }
            function datSaoNgauNhien(meteor) {
                
                const x = 23 + Math.random() * 63;   
                const y = 7 + Math.random() * 46;    
                meteor.style.left = x.toFixed(2) + '%';
                meteor.style.top = y.toFixed(2) + '%';
                meteor.dataset.flyX = String(Math.min(.14 + Math.random() * .13, x / 100 - .07));
                meteor.dataset.flyY = String(.10 + Math.random() * .12);
                quyDaoSao(meteor);
            }
            for (let i = 0, meteorCount = TINY_PERF.mobile ? 1 : 4; i < meteorCount; i++) {
                const meteor = document.createElement('span');
                meteor.className = 'tiny-meteor';
                meteor.style.setProperty('--period', (6.1 + Math.random() * 1.4) + 's');
                meteor.style.setProperty('--meteor-delay', (-i * 1.65) + 's');
                datSaoNgauNhien(meteor);
                
                meteor.addEventListener('animationiteration', () => datSaoNgauNhien(meteor));
                sky.appendChild(meteor);
                meteors.push(meteor);
            }
            let resizeSao;
            window.addEventListener('resize', () => {
                clearTimeout(resizeSao);
                resizeSao = setTimeout(() => meteors.forEach(quyDaoSao), 200);
            });

        })();

/* ===== tiny-kado-flower-init ===== */
(()=>{
  const stage = document.getElementById('smile-stage');
  const frame = document.getElementById('kado-flower-frame');
  if (!stage || !frame) return;
  const flowerDoc = "<!DOCTYPE html><html lang=\"vi\"><head><meta charset=\"utf-8\"><style>\n*{margin:0;padding:0;box-sizing:border-box}\nhtml,body{width:100%;height:100%;overflow:hidden;background:transparent}\nbody{display:flex;align-items:flex-end;justify-content:center;perspective:650px}\n.flowers{position:relative;width:100%;height:100%;transform:scale(.90);transform-origin:bottom center;filter:hue-rotate(132deg) saturate(.91)}\n.flower{position:absolute;bottom:12%;left:46%;transform-origin:bottom center;z-index:5;--fl-speed:.75s}\n.flower--1{left:23%;animation:moving-flower-1 4s ease-in-out infinite alternate}\n.flower--2{left:50%;transform:rotate(18deg);animation:moving-flower-2 4.7s ease-in-out infinite alternate}\n.flower--3{left:72%;transform:rotate(-16deg);animation:moving-flower-3 4.2s ease-in-out infinite alternate}\n.flower__leafs{position:relative;animation:blooming-flower 1.8s backwards}\n.flower__leafs--1{animation-delay:.6s}.flower__leafs--2{animation-delay:.95s}.flower__leafs--3{animation-delay:1.25s}\n.flower__leafs::after{content:\"\";position:absolute;left:0;top:0;transform:translate(-50%,-100%);width:7vmin;height:7vmin;border-radius:50%;background:#6bf0ff;filter:blur(7vmin)}\n.flower__leaf{position:absolute;bottom:0;left:50%;width:8vmin;height:11vmin;border-radius:51% 49% 47% 53% / 44% 45% 55% 69%;background-image:linear-gradient(to top,#54b8aa,#a7ffee);transform-origin:bottom center;opacity:.9;box-shadow:inset 0 0 2vmin rgba(255,255,255,.5)}\n.flower__leaf--1{transform:translate(-10%,1%) rotateY(40deg) rotateX(-50deg)}\n.flower__leaf--2{transform:translate(-50%,-4%) rotateX(40deg)}\n.flower__leaf--3{transform:translate(-90%,0%) rotateY(45deg) rotateX(50deg)}\n.flower__leaf--4{height:8vmin;border-radius:4vmin 10vmin 4vmin 4vmin;transform-origin:bottom left;transform:translate(0,18%) rotateX(70deg) rotate(-43deg);background:linear-gradient(to top,#39c6d6,#a7ffee);z-index:1;opacity:.8}\n.flower__white-circle{position:absolute;left:-3.5vmin;top:-3vmin;width:9vmin;height:4vmin;border-radius:50%;background:#fff}\n.flower__white-circle::after{content:\"\";position:absolute;left:50%;top:45%;width:60%;height:60%;transform:translate(-50%,-50%);border-radius:50%;background:linear-gradient(90deg,#ffeb12,#ffce00)}\n.flower__line{height:54vmin;width:1.5vmin;background:linear-gradient(to left,rgba(0,0,0,.2),transparent,rgba(255,255,255,.2)),linear-gradient(to top,transparent 8%,#14757a,#39c6d6);box-shadow:inset 0 0 2px rgba(0,0,0,.5);animation:grow-flower-tree 2.8s backwards}\n.flower--1 .flower__line{height:65vmin;animation-delay:.35s}\n.flower--2 .flower__line{height:53vmin;animation-delay:.55s}\n.flower--3 .flower__line{height:58vmin;animation-delay:.75s}\n.flower__line__leaf{--w:7vmin;--h:calc(var(--w) + 2vmin);position:absolute;top:20%;left:90%;width:var(--w);height:var(--h);border-top-right-radius:var(--h);border-bottom-left-radius:var(--h);background:linear-gradient(to top,rgba(20,117,122,.4),#39c6d6)}\n.flower__line__leaf--1{transform:rotate(70deg) rotateY(30deg);animation:blooming-leaf-right var(--fl-speed) 1.6s backwards}\n.flower__line__leaf--2{top:45%;transform:rotate(70deg) rotateY(30deg);animation:blooming-leaf-right var(--fl-speed) 1.9s backwards}\n.flower__line__leaf--3,.flower__line__leaf--4,.flower__line__leaf--6{border-top-right-radius:0;border-bottom-left-radius:0;border-top-left-radius:var(--h);border-bottom-right-radius:var(--h);left:-460%;top:12%;transform:rotate(-70deg) rotateY(30deg);animation:blooming-leaf-left var(--fl-speed) 1.45s backwards}\n.flower__line__leaf--4{top:40%;animation-delay:1.85s}\n.flower__line__leaf--5{top:0;transform-origin:left;transform:rotate(70deg) rotateY(30deg) scale(.6);animation:blooming-leaf-right var(--fl-speed) 2.05s backwards}\n.flower__line__leaf--6{top:-2%;left:-450%;transform-origin:right;transform:rotate(-70deg) rotateY(30deg) scale(.6);animation-delay:2.2s}\n.flower__light{position:absolute;bottom:0;width:1vmin;height:1vmin;border-radius:50%;background:#fffb00;filter:blur(.2vmin);animation:light-ans 3.8s linear infinite backwards}\n.flower__light:nth-child(odd){background:#23f0ff}\n.flower__light--1{left:-2vmin;animation-delay:1s}.flower__light--2{left:3vmin;animation-delay:.5s}.flower__light--3{left:-6vmin;animation-delay:.3s}.flower__light--4{left:6vmin;animation-delay:.9s}.flower__light--5{left:-1vmin;animation-delay:1.5s}.flower__light--6{left:-4vmin;animation-delay:3s}.flower__light--7{left:3vmin;animation-delay:2s}.flower__light--8{left:-6vmin;animation-delay:3.5s}\n.kado-grass{position:absolute;bottom:8%;width:100%;height:18%;pointer-events:none;opacity:.52;background:repeating-linear-gradient(105deg,transparent 0 18px,rgba(82,219,198,.12) 19px 21px,transparent 22px 36px);mask-image:linear-gradient(0deg,black,transparent 90%)}\n@keyframes blooming-flower{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}\n@keyframes grow-flower-tree{from{height:0;opacity:.2}}\n@keyframes blooming-leaf-left{from{transform:rotate(-70deg) rotateY(30deg) scale(0)}}\n@keyframes blooming-leaf-right{from{transform:rotate(70deg) rotateY(30deg) scale(0)}}\n@keyframes moving-flower-1{from{transform:rotate(-3deg)}to{transform:rotate(3deg)}}\n@keyframes moving-flower-2{from{transform:rotate(13deg)}to{transform:rotate(22deg)}}\n@keyframes moving-flower-3{from{transform:rotate(-20deg)}to{transform:rotate(-11deg)}}\n@keyframes light-ans{0%,100%{opacity:0;transform:translateY(0) scale(.7)}35%{opacity:.9}75%{opacity:.35;transform:translateY(-13vmin) translateX(7vmin) scale(1.2)}}\n</style></head><body><div class=\"flowers\"><div class=\"flower flower--1\"><div class=\"flower__leafs flower__leafs--1\"><div class=\"flower__leaf flower__leaf--1\"></div><div class=\"flower__leaf flower__leaf--2\"></div><div class=\"flower__leaf flower__leaf--3\"></div><div class=\"flower__leaf flower__leaf--4\"></div><div class=\"flower__white-circle\"></div><div class=\"flower__light flower__light--1\"></div><div class=\"flower__light flower__light--2\"></div><div class=\"flower__light flower__light--3\"></div><div class=\"flower__light flower__light--4\"></div><div class=\"flower__light flower__light--5\"></div><div class=\"flower__light flower__light--6\"></div><div class=\"flower__light flower__light--7\"></div><div class=\"flower__light flower__light--8\"></div></div><div class=\"flower__line\"><div class=\"flower__line__leaf flower__line__leaf--1\"></div><div class=\"flower__line__leaf flower__line__leaf--2\"></div><div class=\"flower__line__leaf flower__line__leaf--3\"></div><div class=\"flower__line__leaf flower__line__leaf--4\"></div><div class=\"flower__line__leaf flower__line__leaf--5\"></div><div class=\"flower__line__leaf flower__line__leaf--6\"></div></div></div><div class=\"flower flower--2\"><div class=\"flower__leafs flower__leafs--2\"><div class=\"flower__leaf flower__leaf--1\"></div><div class=\"flower__leaf flower__leaf--2\"></div><div class=\"flower__leaf flower__leaf--3\"></div><div class=\"flower__leaf flower__leaf--4\"></div><div class=\"flower__white-circle\"></div><div class=\"flower__light flower__light--1\"></div><div class=\"flower__light flower__light--2\"></div><div class=\"flower__light flower__light--3\"></div><div class=\"flower__light flower__light--4\"></div><div class=\"flower__light flower__light--5\"></div><div class=\"flower__light flower__light--6\"></div><div class=\"flower__light flower__light--7\"></div><div class=\"flower__light flower__light--8\"></div></div><div class=\"flower__line\"><div class=\"flower__line__leaf flower__line__leaf--1\"></div><div class=\"flower__line__leaf flower__line__leaf--2\"></div><div class=\"flower__line__leaf flower__line__leaf--3\"></div><div class=\"flower__line__leaf flower__line__leaf--4\"></div></div></div><div class=\"flower flower--3\"><div class=\"flower__leafs flower__leafs--3\"><div class=\"flower__leaf flower__leaf--1\"></div><div class=\"flower__leaf flower__leaf--2\"></div><div class=\"flower__leaf flower__leaf--3\"></div><div class=\"flower__leaf flower__leaf--4\"></div><div class=\"flower__white-circle\"></div><div class=\"flower__light flower__light--1\"></div><div class=\"flower__light flower__light--2\"></div><div class=\"flower__light flower__light--3\"></div><div class=\"flower__light flower__light--4\"></div><div class=\"flower__light flower__light--5\"></div><div class=\"flower__light flower__light--6\"></div><div class=\"flower__light flower__light--7\"></div><div class=\"flower__light flower__light--8\"></div></div><div class=\"flower__line\"><div class=\"flower__line__leaf flower__line__leaf--1\"></div><div class=\"flower__line__leaf flower__line__leaf--2\"></div><div class=\"flower__line__leaf flower__line__leaf--3\"></div><div class=\"flower__line__leaf flower__line__leaf--4\"></div></div></div><div class=\"kado-grass\"></div></div></body></html>";
  let ready=false;
  const start=()=>{
    if(ready || !stage.classList.contains('hien-thi') || !matchMedia("(min-width:701px) and (pointer:fine)").matches) return;
    ready=true;
    frame.srcdoc=flowerDoc;
  };
  new MutationObserver(start).observe(stage,{attributes:true,attributeFilter:['class']});
  start();
})();

/* ===== tiny-upgrade-particles ===== */
(()=>{
  const root=document.getElementById('tiny-wish-decor');
  if(!root)return;
  const motif=(id,html)=>{const host=document.getElementById(id);if(host){const el=document.createElement('div');el.className='tiny-upgrade-motif '+({ 'decor-want':'tiny-want-upgrade','decor-health':'tiny-health-upgrade','decor-beauty':'tiny-beauty-upgrade'}[id]);el.innerHTML=html;host.appendChild(el);}};
  const wishSvg='<svg class="motif-left" viewBox="0 0 270 360" aria-hidden="true"><path class="wish-guide" d="M-15 280 Q80 246 83 171 T235 60"/><path class="wish-trace" d="M5 313 Q73 247 101 186 T250 32"/><path class="wish-trace" d="M26 332 Q108 270 130 209 T267 70" opacity=".38"/></svg><svg class="motif-right" viewBox="0 0 270 360" aria-hidden="true"><path class="wish-guide" d="M-15 280 Q80 246 83 171 T235 60"/><path class="wish-trace" d="M5 313 Q73 247 101 186 T250 32"/><path class="wish-trace" d="M26 332 Q108 270 130 209 T267 70" opacity=".38"/></svg><i class="tiny-wish-jewel one"></i><i class="tiny-wish-jewel two"></i>';
  motif('decor-want',wishSvg);
  const plusSvg='<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M36 12 H64 V36 H88 V64 H64 V88 H36 V64 H12 V36 H36 Z"/></svg>';
  motif('decor-health','<div class="tiny-heal-sigil one">'+plusSvg+'</div><div class="tiny-heal-sigil two">'+plusSvg+'</div>');
  const flower='<svg viewBox="0 0 260 300" aria-hidden="true"><g>'+Array.from({length:6},(_,i)=>'<path d="M130 151 C86 120 88 74 130 38 C172 74 174 120 130 151" transform="rotate('+(i*60)+' 130 151)" />').join('')+'<circle class="orchid-nucleus" cx="130" cy="151" r="8"/><path d="M130 160 Q110 222 148 285" opacity=".6"/></g></svg>';
  if(!window.TINY_PERF?.mobile) motif('decor-beauty',flower.replace('<svg ','<svg class="tiny-orchid-svg motif-left" ') + flower.replace('<svg ','<svg class="tiny-orchid-svg motif-right" '));
  const canvas=document.createElement('canvas');canvas.id='tiny-upgrade-canvas';canvas.setAttribute('aria-hidden','true');root.appendChild(canvas);
  const ctx=canvas.getContext('2d',{alpha:true});if(!ctx)return;
  const scenes=['decor-want','decor-health','decor-beauty'].map(id=>document.getElementById(id));
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let w=1,h=1,dpr=1,particles=[],mode=-1,frame=0,last=0;
  const rnd=(lo,hi)=>lo+Math.random()*(hi-lo);
  function resize(){w=innerWidth;h=innerHeight;dpr=TINY_PERF.canvasDpr(w,h,1.5);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);}
  resize();window.addEventListener('resize',resize,{passive:true});
  function particlesFor(idx){const count=TINY_PERF.mobile?7:w<700?10:19;particles=Array.from({length:count},(_,i)=>{
    const edge=i%2===0;return {x:rnd(edge?.02:.76,edge?.23:.98)*w,y:rnd(.09,.89)*h,r:rnd(.8,2.7),speed:rnd(.11,.35),alpha:rnd(.25,.7),phase:rnd(0,6.28),kind:idx===1&&i%4===0?'plus':idx===2&&i%3===0?'diamond':'orb'};
  });}
  function dot(p,t,idx){const x=p.x+Math.sin(t*.00056+p.phase)*14,y=p.y-t*p.speed*.012 % (h+40);const yy=((y% (h+40))+(h+40))%(h+40)-20;
    const a=p.alpha*(.60+.4*Math.sin(t*.0016+p.phase));
    if(!Number.isFinite(x)||!Number.isFinite(yy))return;
    ctx.globalAlpha=Math.max(.03,a);ctx.shadowBlur=TINY_PERF.mobile?0:TINY_PERF.lite?5:10;ctx.shadowColor=idx===0?'#f99cd3':idx===1?'#ffacc9':'#ffe2ff';
    ctx.strokeStyle=idx===0?'#fbbee4':idx===1?'#ffd4e1':'#ffe1fa';ctx.fillStyle=ctx.strokeStyle;ctx.lineWidth=1.3;
    if(p.kind==='plus'){const s=p.r*2.4;ctx.beginPath();ctx.moveTo(x-s,yy);ctx.lineTo(x+s,yy);ctx.moveTo(x,yy-s);ctx.lineTo(x,yy+s);ctx.stroke();}
    else if(p.kind==='diamond'){const s=p.r*2.2;ctx.beginPath();ctx.moveTo(x,yy-s);ctx.lineTo(x+s*.45,yy);ctx.lineTo(x,yy+s);ctx.lineTo(x-s*.45,yy);ctx.closePath();ctx.stroke();}
    else{ctx.beginPath();ctx.arc(x,yy,p.r,0,Math.PI*2);ctx.fill();}
  }
  function select(){return scenes.findIndex(node=>node&&node.classList.contains('is-visible'));}
  const frameInterval=1000/TINY_PERF.ambientFps;
  function schedule(){if(!reduced&&!frame&&!document.hidden)frame=requestAnimationFrame(animate);}
  function animate(now){frame=0;
    const current=select();if(current!==mode){mode=current;particlesFor(mode);last=0;}
    if(mode<0||document.hidden){ctx.clearRect(0,0,w,h);return;}
    
    
    if(!TINY_PERF.mobile && document.documentElement.classList.contains('tiny-scene-transition')){
      if(!window.__tinyTransitionCanvasCleared){ctx.clearRect(0,0,w,h);window.__tinyTransitionCanvasCleared=true;}
      schedule();return;
    }
    window.__tinyTransitionCanvasCleared=false;
    
    
    
    
    if(mode===2){ctx.clearRect(0,0,w,h);return;}
    if(now-last>=frameInterval||reduced){last=now;ctx.clearRect(0,0,w,h);particles.forEach(p=>dot(p,reduced?0:now,mode));ctx.globalAlpha=1;ctx.shadowBlur=0;}
    schedule();
  }
  const trigger=()=>{
    if(frame)cancelAnimationFrame(frame);
    frame=0;
    if(!document.hidden)frame=requestAnimationFrame(animate);
  };
  scenes.forEach(node=>node&&new MutationObserver(trigger).observe(node,{attributes:true,attributeFilter:['class']}));
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden){
      if(frame)cancelAnimationFrame(frame);
      frame=0;
    }else trigger();
  });trigger();

  
  const share=document.getElementById('share-flight-scene');
  if(share){let fired=false;
    const obs=new MutationObserver(()=>{if(!share.classList.contains('share-thank-you')){fired=false;return;}if(fired)return;fired=true;
      if(reduced)return;
      const face=document.querySelector('#share-tiny #khung-mat')||document.getElementById('share-tiny');
      if(!face)return;
      const r=face.getBoundingClientRect(), x=r.left+r.width/2, y=r.top+r.height*.5;
      const c=document.createElement('canvas');c.id='tiny-joy-burst';c.setAttribute('aria-hidden','true');document.body.appendChild(c);
      const cc=c.getContext('2d');if(!cc){c.remove();return;}
      const W=innerWidth,H=innerHeight,ratio=TINY_PERF.canvasDpr(W,H,1.5);
      c.width=Math.round(W*ratio);c.height=Math.round(H*ratio);cc.setTransform(ratio,0,0,ratio,0,0);
      const count=W<700?12:22;
      const arr=Array.from({length:count},(_,i)=>{const a=(i/count)*Math.PI*2+rnd(-.18,.18),v=rnd(28,82);return {a,x,y,v,spin:rnd(-3,3),r:rnd(2.4,5),color:['#fccce7','#ffbadb','#fff0ba'][i%3]};});
      const start=performance.now();function move(t){const e=Math.min(1,(t-start)/1600);cc.clearRect(0,0,W,H);cc.globalAlpha=(1-e)*.9;
        arr.forEach(p=>{const px=p.x+Math.cos(p.a)*p.v*e*2,py=p.y+Math.sin(p.a)*p.v*e*2+e*e*70;
        cc.save();cc.translate(px,py);cc.rotate(e*p.spin);cc.fillStyle=p.color;cc.shadowColor=p.color;cc.shadowBlur=8;
        cc.beginPath();cc.moveTo(0,-p.r*1.6);cc.lineTo(p.r*.55,0);cc.lineTo(0,p.r*1.6);cc.lineTo(-p.r*.55,0);cc.closePath();cc.fill();cc.restore();});
        if(e<1)requestAnimationFrame(move);else c.remove();}
      requestAnimationFrame(move);
    });obs.observe(share,{attributes:true,attributeFilter:['class']});
  }
})();

/* ===== tiny-final-garden-health-motions ===== */
(()=>{
  'use strict';
  const beauty=document.getElementById('decor-beauty');
  const health=document.getElementById('decor-health');
  if(!beauty || !health || document.getElementById('tiny-meadow-scene'))return;
  beauty.insertAdjacentHTML('afterbegin', '<svg class="tiny-meadow-scene" id="tiny-meadow-scene" viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden="true">\n<defs><linearGradient id="tinyHillGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#352238" stop-opacity=".86"/><stop offset=".55" stop-color="#251629" stop-opacity=".96"/><stop offset="1" stop-color="#170a18" stop-opacity="1"/></linearGradient>\n<mask id="tinyStarAboveHorizon" maskUnits="userSpaceOnUse"><rect width="1600" height="900" fill="#fff"/><path d="M0 890 C130 862 226 824 390 791 S580 761 730 740 C930 712 1007 722 1080 751 C1240 795 1380 815 1600 898 L1600 950 L0 950 Z" fill="#000"/></mask>\n<radialGradient id="tinyStarGlow"><stop offset="0" stop-color="#fef5fc" stop-opacity=".55"/><stop offset=".38" stop-color="#f6d7ed" stop-opacity=".19"/><stop offset="1" stop-color="#edcae5" stop-opacity="0"/></radialGradient><radialGradient id="tinyMoonFace" cx="34%" cy="28%" r="75%"><stop offset="0" stop-color="#fffef7"/><stop offset=".37" stop-color="#f6eff2"/><stop offset=".75" stop-color="#e9d2e2"/><stop offset="1" stop-color="#d2abc8"/></radialGradient>\n<filter id="tinyStarBloom" x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur stdDeviation="5"/></filter></defs>\n<path id="tinyOrbitFlightPath" d="M930 954 C1070 823 1024 780 1115 680 C1230 528 1320 354 1410 165 C1450 81 1453 18 1468 -68" fill="none" stroke="none"/>\n<g mask="url(#tinyStarAboveHorizon)"><g id="tiny-orbit-trails" class="tiny-orbit-trail"></g><g id="tiny-orbit-star" class="tiny-orbit-star tiny-glow-planet tiny-moon" style="opacity:0">\n \n <circle r="104" fill="url(#tinyStarGlow)" opacity=".53"/>\n <circle r="50" fill="none" stroke="#fee2f7" stroke-width="3" opacity=".09"/>\n <circle class="tiny-planet-sphere" r="34" fill="url(#tinyMoonFace)" stroke="#faf2f7" stroke-width="1.15"/>\n <ellipse cx="-11" cy="-9" rx="9" ry="6.8" fill="#cfb4c7" opacity=".19" transform="rotate(-22 -11 -9)"/>\n <ellipse cx="13" cy="12" rx="7" ry="5" fill="#ceb0c6" opacity=".15" transform="rotate(-17 13 12)"/>\n <circle cx="14" cy="-16" r="4.2" fill="#d3b9cb" opacity=".14"/>\n <circle cx="-15" cy="17" r="3.8" fill="#c6a6bf" opacity=".16"/>\n <path d="M-20 -19 Q -10 -25 2 -25" stroke="#fff" stroke-width="2" opacity=".19" fill="none" stroke-linecap="round"/>\n </g></g>\n<path class="tiny-terrain" d="M0 890 C130 862 226 824 390 791 S580 761 730 740 C930 712 1007 722 1080 751 C1240 795 1380 815 1600 898 L1600 950 L0 950 Z"/>\n<path class="tiny-horizon-rim" d="M0 890 C130 862 226 824 390 791 S580 761 730 740 C930 712 1007 722 1080 751 C1240 795 1380 815 1600 898"/>\n<g class="tiny-meadow-flowers"><g class="tiny-meadow-blossom" style="--wave:4.2s;--delay:-0.00s" transform="translate(82 861) scale(0.7)"><path class="stem" d="M0 0 Q -7 -15 0 -32 M-2 -13 Q-14 -24 -16 -20 M0 -21 Q11 -29 14 -22"/><g transform="translate(0 -33)" class="flowerhead"><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(0 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(72 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(144 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(216 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(288 0 0)"/></g><circle class="center" cx="0" cy="-33" r="3.9"/></g><g class="tiny-meadow-blossom" style="--wave:4.9s;--delay:-0.27s" transform="translate(175 835) scale(0.85)"><path class="stem" d="M0 0 Q -7 -15 0 -32 M-2 -13 Q-14 -24 -16 -20 M0 -21 Q11 -29 14 -22"/><g transform="translate(0 -33)" class="flowerhead"><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(0 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(72 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(144 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(216 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(288 0 0)"/></g><circle class="center" cx="0" cy="-33" r="3.9"/></g><g class="tiny-meadow-blossom" style="--wave:5.5s;--delay:-0.54s" transform="translate(257 813) scale(0.8)"><path class="stem" d="M0 0 Q -7 -15 0 -32 M-2 -13 Q-14 -24 -16 -20 M0 -21 Q11 -29 14 -22"/><g transform="translate(0 -33)" class="flowerhead"><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(0 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(72 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(144 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(216 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(288 0 0)"/></g><circle class="center" cx="0" cy="-33" r="3.9"/></g><g class="tiny-meadow-blossom" style="--wave:6.2s;--delay:-0.81s" transform="translate(345 795) scale(1)"><path class="stem" d="M0 0 Q -7 -15 0 -32 M-2 -13 Q-14 -24 -16 -20 M0 -21 Q11 -29 14 -22"/><g transform="translate(0 -33)" class="flowerhead"><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(0 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(72 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(144 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(216 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(288 0 0)"/></g><circle class="center" cx="0" cy="-33" r="3.9"/></g><g class="tiny-meadow-blossom" style="--wave:6.8s;--delay:-1.08s" transform="translate(460 775) scale(0.65)"><path class="stem" d="M0 0 Q -7 -15 0 -32 M-2 -13 Q-14 -24 -16 -20 M0 -21 Q11 -29 14 -22"/><g transform="translate(0 -33)" class="flowerhead"><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(0 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(72 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(144 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(216 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(288 0 0)"/></g><circle class="center" cx="0" cy="-33" r="3.9"/></g><g class="tiny-meadow-blossom" style="--wave:4.2s;--delay:-1.35s" transform="translate(555 764) scale(0.7)"><path class="stem" d="M0 0 Q -7 -15 0 -32 M-2 -13 Q-14 -24 -16 -20 M0 -21 Q11 -29 14 -22"/><g transform="translate(0 -33)" class="flowerhead"><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(0 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(72 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(144 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(216 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(288 0 0)"/></g><circle class="center" cx="0" cy="-33" r="3.9"/></g><g class="tiny-meadow-blossom" style="--wave:4.9s;--delay:-1.62s" transform="translate(652 746) scale(0.8)"><path class="stem" d="M0 0 Q -7 -15 0 -32 M-2 -13 Q-14 -24 -16 -20 M0 -21 Q11 -29 14 -22"/><g transform="translate(0 -33)" class="flowerhead"><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(0 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(72 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(144 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(216 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(288 0 0)"/></g><circle class="center" cx="0" cy="-33" r="3.9"/></g><g class="tiny-meadow-blossom" style="--wave:5.5s;--delay:-1.89s" transform="translate(1190 773) scale(0.8)"><path class="stem" d="M0 0 Q -7 -15 0 -32 M-2 -13 Q-14 -24 -16 -20 M0 -21 Q11 -29 14 -22"/><g transform="translate(0 -33)" class="flowerhead"><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(0 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(72 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(144 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(216 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(288 0 0)"/></g><circle class="center" cx="0" cy="-33" r="3.9"/></g><g class="tiny-meadow-blossom" style="--wave:6.2s;--delay:-2.16s" transform="translate(1320 808) scale(0.75)"><path class="stem" d="M0 0 Q -7 -15 0 -32 M-2 -13 Q-14 -24 -16 -20 M0 -21 Q11 -29 14 -22"/><g transform="translate(0 -33)" class="flowerhead"><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(0 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(72 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(144 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(216 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(288 0 0)"/></g><circle class="center" cx="0" cy="-33" r="3.9"/></g><g class="tiny-meadow-blossom" style="--wave:6.8s;--delay:-2.43s" transform="translate(1454 851) scale(0.9)"><path class="stem" d="M0 0 Q -7 -15 0 -32 M-2 -13 Q-14 -24 -16 -20 M0 -21 Q11 -29 14 -22"/><g transform="translate(0 -33)" class="flowerhead"><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(0 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(72 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(144 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(216 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(288 0 0)"/></g><circle class="center" cx="0" cy="-33" r="3.9"/></g><g class="tiny-meadow-blossom" style="--wave:4.2s;--delay:-2.70s" transform="translate(1538 887) scale(0.62)"><path class="stem" d="M0 0 Q -7 -15 0 -32 M-2 -13 Q-14 -24 -16 -20 M0 -21 Q11 -29 14 -22"/><g transform="translate(0 -33)" class="flowerhead"><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(0 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(72 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(144 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(216 0 0)"/><ellipse cx="0" cy="-10" rx="3.8" ry="7" transform="rotate(288 0 0)"/></g><circle class="center" cx="0" cy="-33" r="3.9"/></g></g></svg>');
  
  const mobile=matchMedia('(max-width:700px)').matches;
  for(let i=0,n=mobile?4:14;i<n;i++){
    const b=document.createElement('i');b.className='tiny-beauty-firefly';
    const x=((i*61.17)%95)+2.5, y=17+((i*34.93)%73);
    const z=2.1+(i%5)*.56;
    b.style.cssText=`--x:${x.toFixed(1)}%;--y:${y.toFixed(1)}%;--sz:${z}px;--d:${4.2+(i%6)*.85}s;--p:${1.8+(i%7)*.49}s;--delay:-${(i*.71)%8}s;`;
    beauty.appendChild(b);
  }
  
  
  const orbit=document.getElementById('tinyOrbitFlightPath');
  const star=document.getElementById('tiny-orbit-star');
  const group=document.getElementById('tiny-orbit-trails');
  
  const mobileBeautyMoonless = true; 
  if (mobileBeautyMoonless) { star.style.display='none'; group.style.display='none'; }
  const svgNS='http://www.w3.org/2000/svg';
  const tail=[];
  for(let i=0;i<(mobileBeautyMoonless?0:3);i++){
    const c=document.createElementNS(svgNS,'circle');
    c.setAttribute('r',String(3.3-i*.3));c.setAttribute('opacity',String(.52-i*.058));
    group.appendChild(c);tail.push(c);
  }
  const motionReduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let raf=0,active=false,begin=0,lastOrbit=0;
  let arcLength=0; if(!mobileBeautyMoonless)try{arcLength=orbit.getTotalLength();}catch(e){}
  
  
  let orbitSamples=null;
  const orbitSampleCount=192;
  function prepareOrbitSamples(){
    if(mobileBeautyMoonless||!arcLength||orbitSamples)return;
    try {
      const samples=[];
      for(let j=0;j<=orbitSampleCount;j++) {
        const p=orbit.getPointAtLength(arcLength*j/orbitSampleCount);
        samples.push([p.x,p.y]);
      }
      orbitSamples=samples;
    } catch(e){orbitSamples=null;}
  }
  if(!mobileBeautyMoonless && arcLength) {
    if('requestIdleCallback' in window)requestIdleCallback(prepareOrbitSamples,{timeout:1400});
    else setTimeout(prepareOrbitSamples,350);
  }
  function cachedOrbitPoint(f){
    if(!orbitSamples) return orbit.getPointAtLength(Math.max(0,Math.min(1,f))*arcLength);
    const t=Math.max(0,Math.min(1,f))*orbitSampleCount;
    const i=Math.min(orbitSampleCount-1,Math.floor(t)),r=t-i;
    const a=orbitSamples[i],b=orbitSamples[i+1];
    return {x:a[0]+(b[0]-a[0])*r,y:a[1]+(b[1]-a[1])*r};
  }
  function frame(t){
    raf=0;
    if(!active||document.hidden||!arcLength)return;
    if (lastOrbit && t-lastOrbit < 1000/TINY_PERF.orbitFps) {raf=requestAnimationFrame(frame);return;}
    lastOrbit=t;
    const duration=9600, progress=((t-begin)%duration)/duration;
    
    
    const e=progress<.90 ? progress/.90 : 1;
    const pt=cachedOrbitPoint(1-e);
    star.setAttribute('transform',`translate(${pt.x.toFixed(2)} ${pt.y.toFixed(2)})`);
    star.style.opacity=(progress>.90)?'0':String(Math.min(1,Math.max(0,(progress-.02)/.08))*Math.min(1,Math.max(0,(.90-progress)/.07)));
    tail.forEach((node,i)=>{
      const v=Math.min(1,Math.max(0,1-e+(i+1)*.018));
      const p=cachedOrbitPoint(v);
      node.setAttribute('cx',p.x.toFixed(2));node.setAttribute('cy',p.y.toFixed(2));
      node.setAttribute('opacity',String(Math.max(0,(.52-i*.058)*Math.min(1,(progress-.02)/.06))));
    });
    raf=requestAnimationFrame(frame);
  }
  function sync(){
    if(mobileBeautyMoonless)return;
    const visible=beauty.classList.contains('is-visible')&&!document.hidden;
    if(visible===active)return;
    active=visible;if(raf)cancelAnimationFrame(raf);raf=0;
    if(visible){begin=performance.now();frame(begin+(motionReduced?4300:0));}
    else {star.style.opacity='0';tail.forEach(n=>n.setAttribute('opacity','0'));}
  }
  new MutationObserver(sync).observe(beauty,{attributes:true,attributeFilter:['class']});
  document.addEventListener('visibilitychange',sync);sync();
  if(motionReduced){active=false;star.style.opacity='0';}
  
  const fauna=document.createElement('div');fauna.className='tiny-health-fauna';
  const birds=[['12%','31%',68,'-1.2s'],['27%','43%',52,'-3.8s'],['57%','26%',42,'-2.1s'],['7%','61%',38,'-4.2s']];
  birds.slice(0,mobile?3:4).forEach(([x,y,w,delay],i)=>{
    const el=document.createElementNS(svgNS,'svg');el.setAttribute('viewBox','0 0 90 45');el.classList.add('tiny-bird');
    el.setAttribute('aria-hidden','true');el.style.cssText=`left:${x};top:${y};--width:${w}px;--fly:${5.5+i*1.1}s;--delay:${delay};`;
    el.innerHTML='<path class="left-wing" d="M45 28 Q27 6 4 18"/><path class="right-wing" d="M45 28 Q63 4 85 18"/><path d="M41 26 Q45 30 49 26" opacity=".6"/>';
    fauna.appendChild(el);
  });
  const butterflies=[['6%','47%',62,'-1.8s'],['35%','56%',46,'-4s'],['73%','19%',50,'-3.1s'],['18%','72%',39,'-2.4s']];
  butterflies.slice(0,mobile?2:4).forEach(([x,y,w,delay],i)=>{
    const el=document.createElementNS(svgNS,'svg');el.setAttribute('viewBox','0 0 88 78');el.classList.add('tiny-health-butterfly');
    el.setAttribute('aria-hidden','true');el.style.cssText=`left:${x};top:${y};--width:${w}px;--fly:${6.5+i*.7}s;--delay:${delay};`;
    el.innerHTML='<g class="left-wing"><path d="M44 39 C17 6 1 17 20 43 C1 59 22 73 44 42 Z"/></g><g class="right-wing"><path d="M44 39 C71 6 87 17 68 43 C87 59 66 73 44 42 Z"/></g><path class="wing-body" d="M44 30 Q47 42 44 55 M44 30 L36 23 M44 30 L52 23"/>';
    fauna.appendChild(el);
  });
  health.appendChild(fauna);
  
  
  const share=document.getElementById('share-flight-scene');
  const tiny=document.getElementById('share-tiny');
  if(share&&tiny){
    const ns='http://www.w3.org/2000/svg';
    const smooth=t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t)};
    let raf=0, currentRun=0, active=false;
    let shapes=[];
    function geometry(progress){
      
      const shrink=smooth(progress);
      const fold=smooth((progress-.31)/.69);
      const steps=32, upper=[], lower=[];
      for(let i=0;i<=steps;i++){
        const x=9+82*i/steps;
        const edge=Math.pow(Math.abs((x-50)/41),10);
        const openHalf=43-17*edge; 
        const half=openHalf*(1-shrink)+5.4*shrink;
        const cusp=1-Math.abs((x-50)/41);
        const y=50+15*shrink-34*fold*cusp;
        upper.push([x,y-half]);lower.push([x,y+half]);
      }
      const fmt=([x,y])=>x.toFixed(2)+' '+y.toFixed(2);
      const right=lower[lower.length-1],left=lower[0];
      
      let d='M '+fmt(upper[0]);
      for(let i=1;i<upper.length;i++)d+=' L '+fmt(upper[i]);
      d+=' Q 98 '+((upper[steps][1]+right[1])/2).toFixed(2)+' '+fmt(right);
      for(let i=steps-1;i>=0;i--)d+=' L '+fmt(lower[i]);
      d+=' Q 2 '+((left[1]+upper[0][1])/2).toFixed(2)+' '+fmt(upper[0])+' Z';
      return d;
    }
    function cleanup(){
      currentRun++;
      if(raf)cancelAnimationFrame(raf);raf=0;
      active=false;
      tiny.classList.remove('tiny-folding-smile','tiny-caret-restored');
      tiny.querySelectorAll('.tiny-folding-smile-svg, .tiny-restored-caret').forEach(el=>el.remove());
      shapes=[];
    }
    function start(){
      if(active || share.classList.contains('reality-leaving'))return;
      cleanup();active=true;
      const eyes=tiny.querySelectorAll('#khung-mat .con-mat');
      if(eyes.length!==2){active=false;return;}
      eyes.forEach((eye,i)=>{
        
        eye.querySelectorAll('.tiny-morph-svg,.tiny-restored-caret,.tiny-folding-smile-svg').forEach(el=>el.remove());
        eye.classList.remove('tiny-actual-morph');
        const svg=document.createElementNS(ns,'svg');
        svg.classList.add('tiny-folding-smile-svg');
        svg.setAttribute('viewBox','0 0 100 100');
        svg.setAttribute('aria-hidden','true');
        const defs=document.createElementNS(ns,'defs');
        const grad=document.createElementNS(ns,'linearGradient');
        const gid='tiny-smile-cyan-'+i;grad.id=gid;
        grad.setAttribute('x1','0%');grad.setAttribute('y1','0%');grad.setAttribute('x2','100%');grad.setAttribute('y2','100%');
        [['0%','#fab8d9'],['38%','#ed4e99'],['80%','#f22e8f'],['100%','#fbbada']].forEach(([at,color])=>{
          const stop=document.createElementNS(ns,'stop');stop.setAttribute('offset',at);stop.setAttribute('stop-color',color);grad.appendChild(stop);
        });defs.appendChild(grad);svg.appendChild(defs);
        const path=document.createElementNS(ns,'path');path.classList.add('smile-morph-fill');
        path.setAttribute('fill','url(#'+gid+')');path.setAttribute('d',geometry(0));svg.appendChild(path);
        eye.appendChild(svg);shapes.push(path);
      });
      
      tiny.classList.add('tiny-folding-smile');
      const run=++currentRun,t0=performance.now(),duration=660;
      function draw(now){
        if(run!==currentRun)return;
        const t=Math.min(1,(now-t0)/duration);
        const d=geometry(t);
        shapes.forEach(p=>p.setAttribute('d',d));
        if(t<1)raf=requestAnimationFrame(draw);else raf=0;
      }
      raf=requestAnimationFrame(draw);
    }
    const watch=new MutationObserver(()=>{
      if(share.classList.contains('share-thank-you')&&!share.classList.contains('reality-leaving'))start();
      else if(active)cleanup();
    });
    watch.observe(share,{attributes:true,attributeFilter:['class']});
  }

})();

/* ===== tiny-reality-moon-rover-script ===== */
(() => {
  const scene = document.getElementById('tiny-reality-scene');
  const rover = document.getElementById('tiny-moon-rover');
  const shop = document.getElementById('tiny-shop-scene');
  if (!scene || !rover) return;
  let frame = 0, startedAt = 0, lastRoverFrame = 0;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const active = () => document.visibilityState === 'visible' && scene.classList.contains('reality-visible') && !shop?.classList.contains('shop-visible');
  function putRover(t) {
    
    const x = -80 + 1360 * t;
    const y = 292 - 472 * t * (1 - t);
    const dy = -472 * (1 - 2*t) / 1360;
    const tilt = Math.atan(dy) * 180 / Math.PI;
    rover.setAttribute('transform', `translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${tilt.toFixed(2)}) scale(.72)`);
    const narrow = innerWidth <= 650;
    const fade = narrow
      ? Math.min(1, Math.max(0, (t - .245)/.042), Math.max(0, (.755 - t)/.042))
      : Math.min(1, Math.max(0, (t + .09)/.16), Math.max(0, (1.09 - t)/.15));
    rover.style.opacity = String(fade);
  }
  function tick(time) {
    if (!active()) { frame = 0; return; }
    if (!startedAt) startedAt = time;
    if (lastRoverFrame && time-lastRoverFrame < 1000/TINY_PERF.roverFps) {
      frame = requestAnimationFrame(tick);return;
    }
    lastRoverFrame=time;
    
    const progress = ((time - startedAt) % 13300) / 13300;
    
    const t = innerWidth <= 650 ? .25 + progress * .50 : -.085 + progress * 1.17;
    putRover(t);
    frame = requestAnimationFrame(tick);
  }
  function sync() {
    if (active()) {
      if (reduced) { putRover(.59); return; }
      if (!frame) { startedAt = 0; frame = requestAnimationFrame(tick); }
    } else {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      startedAt = 0;
    }
  }
  new MutationObserver(sync).observe(scene, {attributes:true,attributeFilter:['class']});
  if (shop) new MutationObserver(sync).observe(shop, {attributes:true,attributeFilter:['class']});
  document.addEventListener('visibilitychange', sync);
  sync();
})();

/* ===== tiny-mobile-lifecycle ===== */
(()=>{
 if(!window.TINY_PERF?.mobile)return;
 const sync=()=>document.documentElement.classList.toggle('tiny-page-hidden',document.hidden);
 document.addEventListener('visibilitychange',sync,{passive:true});sync();
})();

/* ===== tiny-beauty-mobile-cull ===== */
(()=>{
 'use strict';
 if(!window.TINY_PERF?.mobile)return;
 const decor=document.getElementById('decor-beauty');
 const stage=document.getElementById('beauty-stage');
 if(!decor||!stage)return;
 
 
 const trim=(selector,limit)=>{
   const nodes=[...document.querySelectorAll(selector)];
   nodes.slice(limit).forEach(node=>node.remove());
   return nodes.slice(0,limit);
 };
 const petals=trim('#decor-beauty .tiny-beauty-petal',4);
 trim('#decor-beauty .tiny-beauty-glint',3);
 trim('#decor-beauty .tiny-beauty-firefly',4);
 trim('#beauty-stage .wish-twinkle',3);
 trim('#decor-beauty .tiny-meadow-blossom',7);
 
 const spareButterfly=stage.querySelector('.butterfly-wrap.right');
 if(spareButterfly)spareButterfly.remove();
 petals.forEach((petal,i)=>{
   petal.style.setProperty('--tiny-v5-delay',`${(i*.38).toFixed(2)}s`);
   petal.style.setProperty('--tiny-v5-duration',`${(6.8+i*.65).toFixed(2)}s`);
   
   petal.addEventListener('animationend',event=>{
     if(event.animationName==='tinyPetalFall')petal.remove();
   },{once:true});
 });
 
 
 if('IntersectionObserver' in window){
   const watch=[...decor.querySelectorAll('.tiny-beauty-glint,.tiny-beauty-firefly'),
                ...stage.querySelectorAll('.wish-twinkle,.butterfly-wrap')];
   const observer=new IntersectionObserver(entries=>{
     for(const entry of entries){
       if(!entry.isIntersecting){observer.unobserve(entry.target);entry.target.remove();}
     }
   },{root:null,rootMargin:'0px',threshold:0});
   watch.forEach(el=>observer.observe(el));
 }
 let wasShown=false;
 const sync=()=>{
   const shown=decor.classList.contains('is-visible');
   if(shown){wasShown=true;return;}
   if(!wasShown)return;
   
   wasShown=false;
   setTimeout(()=>{
     if(decor.classList.contains('is-visible'))return;
     decor.querySelectorAll('.tiny-beauty-petal,.tiny-beauty-firefly').forEach(el=>el.remove());
   },450);
 };
 new MutationObserver(sync).observe(decor,{attributes:true,attributeFilter:['class']});
 sync();
})();

/* ===== tiny-desktop-profile ===== */
if(window.TINY_PERF && !window.TINY_PERF.mobile){
 document.documentElement.classList.add('tiny-desktop-performance');
}

/* ===== tiny-desktop-beauty-scope ===== */
(() => {
  if(window.TINY_PERF?.mobile)return;
  const stage=document.getElementById('beauty-stage');
  if(!stage)return;
  const root=document.documentElement;
  const sync=()=>root.classList.toggle('tiny-pc-beauty-v12',stage.classList.contains('hien-thi'));
  new MutationObserver(sync).observe(stage,{attributes:true,attributeFilter:['class']});
  sync();
})();

/* ===== tiny-ending-script ===== */
(() => {
  'use strict';
  const reality = document.getElementById('tiny-reality-scene');
  const card = document.getElementById('tiny-ending-card');
  if (!reality || !card) return;
  let shown = false;
  const isControl = t => t instanceof Element &&
    !!t.closest('a, button, input, textarea, select, summary, [role="button"], [contenteditable="true"]');
  document.addEventListener('click', event => {
    if (shown) return;
    if (!reality.classList.contains('reality-visible') || !reality.classList.contains('reality-cute')) return;
    if (isControl(event.target)) return;
    shown = true;
    reality.classList.add('ending-reveal');
    card.setAttribute('aria-hidden', 'false');
    requestAnimationFrame(() => requestAnimationFrame(() => card.classList.add('ending-show')));
  }, { passive: true });
})();

/* ===== tiny-aurora-remaster-js ===== */
(() => {
  'use strict';
  const canvas = document.getElementById('tiny-remaster-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
  if (!ctx) return;
  const perf = window.TINY_PERF || {};
  const mobile = !!perf.mobile;
  const lite = !!perf.lite;
  const reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const palette = ['#ffd0e6', '#ffb3d4', '#ffe3b8', '#fff0d6', '#e9cbff'];
  let width = 1, height = 1, dpr = 1, raf = 0, frameTimer = 0, lastFrame = 0, lastTime = 0, sizedW = 0, sizedH = 0, calm = false, calmTimer = 0;
  let stars = [], petals = [], comets = [], bokeh = [], hearts = [];
  const rand = (min, max) => min + Math.random() * (max - min);

  function resize() {
    width = Math.max(1, window.innerWidth || document.documentElement.clientWidth || 1);
    height = Math.max(1, window.innerHeight || document.documentElement.clientHeight || 1);
    sizedW = width; sizedH = height;
    const pixelBudget = mobile ? 360000 : (lite ? 950000 : 1650000);
    dpr = Math.min(window.devicePixelRatio || 1, mobile ? .78 : (lite ? 1 : 1.28), Math.sqrt(pixelBudget / (width * height)));
    canvas.width = Math.max(1, Math.floor(width * dpr));
    canvas.height = Math.max(1, Math.floor(height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const starCount = reduceMotion ? (mobile ? 13 : 24) : (mobile ? 22 : (lite ? 55 : 90));
    stars = Array.from({ length: starCount }, () => ({
      x: rand(0, width), y: rand(0, height), r: rand(.58, mobile ? 1.7 : 2.15),
      phase: rand(0, Math.PI * 2), pulse: rand(1.2, 3.5), drift: rand(-3.4, 3.4),
      color: palette[Math.floor(Math.random() * palette.length)], cross: Math.random() < .23
    }));
    const petalCount = reduceMotion ? 0 : (mobile ? 5 : (lite ? 14 : 22));
    petals = Array.from({ length: petalCount }, () => ({
      x: rand(0, width), y: rand(0, height), r: rand(2.0, mobile ? 4.0 : 5.5),
      vx: rand(-4, 4), vy: rand(-7, -1), phase: rand(0, Math.PI * 2), rot: rand(0, 6.28),
      vr: rand(-.28, .28), color: palette[Math.floor(Math.random() * palette.length)], alpha: rand(.22, .58)
    }));
    const cometCount = reduceMotion ? 0 : (mobile ? 1 : (lite ? 1 : 2));
    comets = Array.from({ length: cometCount }, () => ({
      x: rand(-width, width), y: rand(0, height * .72), speed: rand(70, 155), len: rand(54, mobile ? 88 : 132),
      color: palette[Math.floor(Math.random() * palette.length)], alpha: rand(.42, .84)
    }));
    const bokehCount = reduceMotion ? 0 : (mobile ? 5 : (lite ? 9 : 15));
    bokeh = Array.from({ length: bokehCount }, () => ({
      x: rand(0, width), y: rand(0, height), r: rand(12, mobile ? 28 : 44),
      vy: rand(-5.5, -1.5), vx: rand(-2, 2), phase: rand(0, Math.PI * 2),
      color: palette[Math.floor(Math.random() * palette.length)], alpha: rand(.06, .15)
    }));
    const heartCount = reduceMotion ? 0 : (mobile ? 3 : (lite ? 6 : 10));
    hearts = Array.from({ length: heartCount }, () => ({
      x: rand(0, width), y: rand(height * .25, height + 40), s: rand(6, mobile ? 11 : 16),
      vy: rand(-15, -6), sway: rand(8, 22), phase: rand(0, Math.PI * 2), rot: rand(-.45, .45),
      color: palette[Math.floor(Math.random() * 3)], alpha: rand(.28, .58)
    }));
  }

  function drawBokeh(p, t, dt) {
    p.y += p.vy * dt;
    p.x += (p.vx + Math.sin(t * .21 + p.phase) * 3) * dt;
    if (p.y < -p.r * 2) { p.y = height + p.r * 2; p.x = rand(0, width); }
    const a = p.alpha * (.65 + (Math.sin(t * .8 + p.phase) + 1) * .2);
    const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
    g.addColorStop(0, p.color);
    g.addColorStop(.62, p.color);
    g.addColorStop(1, 'rgba(255,200,225,0)');
    ctx.globalAlpha = a;
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
  }

  function drawHeart(p, t, dt) {
    p.y += p.vy * dt;
    p.x += Math.sin(t * .6 + p.phase) * p.sway * dt;
    if (p.y < -24) { p.y = height + 24; p.x = rand(0, width); }
    const s = p.s;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot + Math.sin(t * .7 + p.phase) * .18);
    ctx.globalAlpha = p.alpha * (.7 + (Math.sin(t * 1.3 + p.phase) + 1) * .15);
    ctx.fillStyle = p.color;
    if (!mobile) { ctx.shadowColor = '#ff8fc3'; ctx.shadowBlur = 8; }
    ctx.beginPath();
    ctx.moveTo(0, s * .32);
    ctx.bezierCurveTo(-s * .95, -s * .28, -s * .52, -s * .98, 0, -s * .42);
    ctx.bezierCurveTo(s * .52, -s * .98, s * .95, -s * .28, 0, s * .32);
    ctx.fill();
    ctx.restore();
  }

  function drawStar(p, t, dt) {
    p.y -= .45 * dt;
    p.x += (p.drift + Math.sin(t * .33 + p.phase) * 1.8) * dt;
    if (p.y < -4) p.y = height + 3;
    if (p.x < -4) p.x = width + 3;
    if (p.x > width + 4) p.x = -3;
    const alpha = .17 + (Math.sin(t * p.pulse + p.phase) + 1) * .28;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    if (p.cross) {
      ctx.save();
      ctx.globalAlpha = alpha * .82;
      ctx.strokeStyle = p.color;
      ctx.lineWidth = .65;
      if (!mobile) {
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 4.5;
      } else {
        ctx.globalAlpha = alpha * .2;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = alpha * .82;
      }
      ctx.beginPath();
      ctx.moveTo(p.x - p.r * 3.1, p.y); ctx.lineTo(p.x + p.r * 3.1, p.y);
      ctx.moveTo(p.x, p.y - p.r * 3.1); ctx.lineTo(p.x, p.y + p.r * 3.1);
      ctx.moveTo(p.x - p.r * 1.7, p.y - p.r * 1.7); ctx.lineTo(p.x + p.r * 1.7, p.y + p.r * 1.7);
      ctx.moveTo(p.x + p.r * 1.7, p.y - p.r * 1.7); ctx.lineTo(p.x - p.r * 1.7, p.y + p.r * 1.7);
      ctx.stroke();
      ctx.restore();
    }
  }

  function drawPetal(p, t, dt) {
    p.y += p.vy * dt;
    p.x += (p.vx + Math.sin(t * .52 + p.phase) * 12) * dt;
    p.rot += p.vr * dt;
    if (p.y < -20) { p.y = height + 18; p.x = rand(0, width); }
    if (p.x < -20) p.x = width + 15;
    if (p.x > width + 20) p.x = -15;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.globalAlpha = p.alpha * (.7 + (Math.sin(t + p.phase) + 1) * .15);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, p.r * .64, p.r * 1.18, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha *= .6;
    ctx.strokeStyle = 'rgba(255,255,255,.7)';
    ctx.lineWidth = .55;
    ctx.beginPath(); ctx.moveTo(0, -p.r * .7); ctx.lineTo(0, p.r * .7); ctx.stroke();
    ctx.restore();
  }

  function drawComet(p, dt) {
    p.x += p.speed * dt;
    p.y -= p.speed * .34 * dt;
    if (p.x > width + p.len || p.y < -p.len) {
      p.x = rand(-width * .7, -p.len);
      p.y = rand(height * .18, height * .83);
      p.speed = rand(70, 155);
    }
    const tailX = p.x - p.len;
    const tailY = p.y + p.len * .34;
    const gradient = ctx.createLinearGradient(tailX, tailY, p.x, p.y);
    gradient.addColorStop(0, 'rgba(255,255,255,0)');
    gradient.addColorStop(.64, p.color + '25');
    gradient.addColorStop(1, 'rgba(255,255,255,.94)');
    ctx.globalAlpha = p.alpha;
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 1.25;
    ctx.beginPath(); ctx.moveTo(tailX, tailY); ctx.lineTo(p.x, p.y); ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2); ctx.fill();
  }

  const targetFps = reduceMotion ? 12 : (mobile ? 24 : 30);
  const frameInterval = 1000 / targetFps;
  function scheduleRender() {
    if (raf || frameTimer || document.hidden || calm) return;
    const delay = lastFrame
      ? Math.max(0, frameInterval - 1000 / 60 - (performance.now() - lastFrame))
      : 0;
    if (delay > 1) {
      frameTimer = setTimeout(() => {
        frameTimer = 0;
        if (!document.hidden && !calm && !raf) raf = requestAnimationFrame(render);
      }, delay);
    } else {
      raf = requestAnimationFrame(render);
    }
  }
  function render(now) {
    raf = 0;
    if (document.hidden || calm) return;
    if (lastFrame && now - lastFrame < frameInterval - 1) { scheduleRender(); return; }
    const dt = Math.min(.05, lastTime ? (now - lastTime) / 1000 : 1 / targetFps);
    lastFrame = now;
    lastTime = now;
    ctx.clearRect(0, 0, width, height);
    const t = now / 1000;
    for (const p of bokeh) drawBokeh(p, t, dt);
    for (const p of stars) drawStar(p, t, dt);
    for (const p of petals) drawPetal(p, t, dt);
    for (const p of hearts) drawHeart(p, t, dt);
    for (const p of comets) drawComet(p, dt);
    ctx.globalAlpha = 1;
    scheduleRender();
  }
  function start() {
    document.documentElement.classList.remove('tiny-remaster-paused');
    scheduleRender();
  }
  function pause() {
    document.documentElement.classList.add('tiny-remaster-paused');
    if (raf) cancelAnimationFrame(raf);
    if (frameTimer) clearTimeout(frameTimer);
    raf = 0;
    frameTimer = 0;
  }
  resize();
  start();
  function setCalm(on) {
    clearTimeout(calmTimer);
    if (on === calm) return;
    calm = on;
    document.documentElement.classList.toggle('tiny-text4-calm', on);
    if (on) {
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
      if (frameTimer) { clearTimeout(frameTimer); frameTimer = 0; }
      ctx.clearRect(0, 0, width, height);
    } else {
      lastFrame = 0; lastTime = 0;
      start();
    }
  }
  const calmEls = ['text-4', 'text-5'].map(id => document.getElementById(id)).filter(Boolean);
  if (mobile && calmEls.length) {
    const syncCalm = () => {
      clearTimeout(calmTimer);
      if (calmEls.some(e => e.classList.contains('hien-thi'))) setCalm(true);
      else if (calm) calmTimer = setTimeout(() => setCalm(false), 1400);
    };
    const mo = new MutationObserver(syncCalm);
    calmEls.forEach(e => mo.observe(e, { attributes: true, attributeFilter: ['class'] }));
    syncCalm();
  }
  let resizeTimer = 0;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (mobile && sizedW && window.innerWidth === sizedW && window.innerHeight === sizedH) return;
      resize(); lastFrame = 0;
    }, 120);
  }, { passive: true });
  document.addEventListener('visibilitychange', () => document.hidden ? pause() : start());
  window.addEventListener('pagehide', pause, { passive: true });
  window.addEventListener('pageshow', start, { passive: true });
})();

/* ===== tiny-romantic-1020-js ===== */
(() => {
  'use strict';
  const perf = window.TINY_PERF || {};
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const host = document.createElement('div');
  host.id = 'rm-tap-hearts';
  host.setAttribute('aria-hidden', 'true');
  document.body.appendChild(host);
  const glyphs = ['♥', '♡', '♥', '❀', '✦'];
  const colors = ['#ff9ccb', '#ffb8d8', '#ffd9ea', '#ffe2b0', '#ff7fb6'];
  const rand = (a, b) => a + Math.random() * (b - a);
  let last = 0, alive = 0;
  const MAX_ALIVE = perf.mobile ? 10 : 24;
  document.addEventListener('pointerdown', ev => {
    const now = performance.now();
    if (now - last < 180 || alive > MAX_ALIVE) return;
    last = now;
    const n = perf.mobile ? 3 : (perf.lite ? 4 : 6);
    for (let i = 0; i < n; i++) {
      const el = document.createElement('span');
      el.className = 'rm-tap-heart';
      el.textContent = glyphs[(Math.random() * glyphs.length) | 0];
      el.style.left = ev.clientX + 'px';
      el.style.top = ev.clientY + 'px';
      el.style.setProperty('--s', rand(12, 24).toFixed(0) + 'px');
      el.style.setProperty('--c', colors[(Math.random() * colors.length) | 0]);
      el.style.setProperty('--dx', rand(-46, 46).toFixed(0) + 'px');
      el.style.setProperty('--dy', rand(-130, -62).toFixed(0) + 'px');
      el.style.setProperty('--r', rand(-28, 28).toFixed(0) + 'deg');
      el.style.setProperty('--d', rand(1.2, 1.9).toFixed(2) + 's');
      alive++;
      el.addEventListener('animationend', () => { el.remove(); alive--; }, { once: true });
      host.appendChild(el);
    }
  }, { passive: true });
})();

/* ===== link chia sẻ thủ công ===== */
(()=>{const a=document.getElementById('share-copy-manual');if(a)a.href=location.href.split(/[?#]/)[0].replace(/index\.html$/,'');})();
