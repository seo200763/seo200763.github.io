/* 순수 자바스크립트 SHA-256 (http 주소에서도 동작하도록 crypto.subtle 을 쓰지 않음) → 16진수 문자열 */
(function(g){
 var K=[],H0=[];
 (function(){var p=2,n=0;function pr(x){for(var i=2;i*i<=x;i++)if(x%i===0)return 0;return 1}
  while(n<64){if(pr(p)){if(n<8)H0[n]=(Math.pow(p,.5)%1)*4294967296|0;K[n]=(Math.pow(p,1/3)%1)*4294967296|0;n++}p++}})();
 function utf8(s){return unescape(encodeURIComponent(s))}
 g.cyhSha256=function(str){
  var m=utf8(str),l=m.length,w=[],i,j,h=H0.slice();
  for(i=0;i<l;i++)w[i>>2]|=m.charCodeAt(i)<<(24-(i%4)*8);
  w[l>>2]|=0x80<<(24-(l%4)*8);
  w[(((l+8)>>6)+1)*16-1]=l*8;
  for(j=0;j<w.length;j+=16){
   var a=h.slice(),x=[];
   for(i=0;i<64;i++){
    if(i<16)x[i]=w[j+i]|0;
    else{var g0=x[i-15],g1=x[i-2];
     x[i]=(x[i-16]+(((g0>>>7)|(g0<<25))^((g0>>>18)|(g0<<14))^(g0>>>3))+x[i-7]+(((g1>>>17)|(g1<<15))^((g1>>>19)|(g1<<13))^(g1>>>10)))|0}
    var e=a[4],t1=(a[7]+(((e>>>6)|(e<<26))^((e>>>11)|(e<<21))^((e>>>25)|(e<<7)))+((e&a[5])^(~e&a[6]))+K[i]+x[i])|0;
    var A=a[0],t2=((((A>>>2)|(A<<30))^((A>>>13)|(A<<19))^((A>>>22)|(A<<10)))+((A&a[1])^(A&a[2])^(a[1]&a[2])))|0;
    a=[(t1+t2)|0,a[0],a[1],a[2],(a[3]+t1)|0,a[4],a[5],a[6]];
   }
   for(i=0;i<8;i++)h[i]=(h[i]+a[i])|0;
  }
  var out='';for(i=0;i<8;i++)out+=('00000000'+(h[i]>>>0).toString(16)).slice(-8);
  return out;
 };
 /* 암호 보기용 가림(복구 토큰으로만 풀림) */
 g.cyhEnc=function(pw,token){var u=unescape(encodeURIComponent(pw)),o='';for(var i=0;i<u.length;i++){var k=parseInt(g.cyhSha256(token+':'+i).slice(0,2),16);o+=String.fromCharCode(u.charCodeAt(i)^k)}return btoa(o)};
 g.cyhDec=function(enc,token){try{var u=atob(enc),o='';for(var i=0;i<u.length;i++){var k=parseInt(g.cyhSha256(token+':'+i).slice(0,2),16);o+=String.fromCharCode(u.charCodeAt(i)^k)}return decodeURIComponent(escape(o))}catch(e){return null}};
})(typeof window!=='undefined'?window:globalThis);
