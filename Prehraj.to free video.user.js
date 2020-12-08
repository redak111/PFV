// ==UserScript==
// @name         Prehraj.to free video
// @namespace    https://prehraj.to/
// @version      0.1
// @description  Video zdarma na Prehraj.to
// @author       nonomomo
// @match        https://tampermonkey.net/
// @include      https://prehraj.to/*
// @grant        none
// ==/UserScript==

(function() {
    var str1 = '<div class="box align-left box-margin-small"><a href="#premium-subscription" class="open-popup btn btn-xlarge" style="position: relative;right:10px;"> <span class="icon-download"></span>Stáhnout soubor </a><button class="open-popup btn btn-xlarge" style="position: absolute;" onclick="var x = document.getElementsByClassName(';
    var str2 = ').item(0).attributes;window.location.href = x[3].value;"> <span class="icon-play"></span>     Přehrát video    </button> </div>';
    var str = str1+"'jw-video jw-reset'"+str2;
    var Obj = document.getElementsByClassName('box align-center box-margin-small')[0];
    var check = document.getElementsByClassName('video-detail-thumb');
    if(check.length > 0){
    }else{
        Obj.outerHTML=str;
    }
})();