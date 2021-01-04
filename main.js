// ==UserScript==
// @name         Prehraj.to Videa zdarma
// @namespace    https://prehraj.to/
// @version      0.2
// @description  Video zdarma na Prehraj.to
// @author       nonomomo
// @match        https://tampermonkey.net/
// @include      https://prehraj.to/*
// @include      https://storage1.premiumcdn.net/*
// @include      https://storage2.premiumcdn.net/*
// @include      https://storage3.premiumcdn.net/*
// @include      https://storage4.premiumcdn.net/*
// @grant GM_setValue
// @grant GM_getValue
// ==/UserScript==
(function() {
    if (document.URL.split("https://")[1].split("/")[0] == "prehraj.to"){
        let str = '<div class="box align-left box-margin-small"><a href="#premium-subscription" class="open-popup btn btn-xlarge" style="position: relative;right:10px;"> <span class="icon-download"></span>Stáhnout soubor </a><button class="open-popup btn btn-xlarge" style="position: absolute;" id="the-play"> <span class="icon-play"></span>     Přehrát video    </button> </div>';
        let Obj = document.getElementsByClassName('box align-center box-margin-small')[0];

        function setIt(){
            let scripts = document.getElementsByTagName("script")
            for (let i = 0; i < scripts.length; ++i) {
                if(scripts[i].innerHTML.includes("let tracks = [")){
                    let Code = scripts[i].innerHTML.split("let tracks = [")[1].split("];")[0].split("{")
                    for (let x = 0; x < Code.length-1; ++x){
                        let Code2 = Code[x+1]
                        let full = Code2.split('file: "')[1].split('",')[0]+"|"+Code2.split('label: "')[1].split('",')[0]
                        GM_setValue(x, full);
                    }
                }
            }
        }
        function waitForIt(){
            document.getElementById("the-play").onclick = function() {
                for (let i = 0; i < 100; ++i) {
                    GM_setValue(i, undefined);
                }
                setIt();
                let x = document.getElementsByClassName("jw-video jw-reset").item(0).attributes;
                window.location.href = x[3].value;
            };
        }

        let checkExist = setInterval(function() {
            let check = document.getElementsByClassName('video-detail-thumb');
            if (check.length <= 0) {
                clearInterval(checkExist);
                Obj.outerHTML=str;
                waitForIt();
            }
        }, 100);
    }else{
        for (let i = 0; i < 100; ++i) {
            let val = GM_getValue(i);
            if (val != undefined){
                 let vid = document.getElementsByTagName('video');
                 let tit = document.createElement("track");
                 let label = val.split("|")[1].split(" - ")[2];
                 let src = val.split("|")[0];
                 let str2 = '<track label="'+label+'" kind="subtitles" srclang="'+label+'" src="'+src+'">';
                 document.getElementsByTagName('video')[0].appendChild(tit);
                 tit.outerHTML = str2;
            }
        }

    }
})();
