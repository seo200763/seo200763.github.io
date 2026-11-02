/* auth.js — 로그인 / 비밀번호 찾기 (GitHub 토큰 확인)
   ※ GitHub Pages 는 정적 사이트라 서버가 없습니다. 이 로그인은 '화면 잠금' 수준이며,
      아이디/비밀번호를 바꾸려면 아래 ACC 값만 고치면 됩니다. */
(function(W){
'use strict';
var ACC={id:'wksehd2001',pw:'ekqwkd12'};          /* ← 로그인 아이디 / 비밀번호 */
var OWNER='youngho1206';                          /* ← GitHub 계정 (토큰 주인이 이 계정이어야 비밀번호를 보여줌) */
var KEY='yh.auth',DAYS=30;

function ok(){
 try{
  if(sessionStorage.getItem(KEY)==='1')return true;
  var v=JSON.parse(localStorage.getItem(KEY)||'null');
  if(v&&v.exp>Date.now()){sessionStorage.setItem(KEY,'1');return true}
  localStorage.removeItem(KEY);
 }catch(e){}
 return false;
}
function login(id,pw,keep){
 if(String(id).trim()!==ACC.id||String(pw)!==ACC.pw)return false;
 try{
  sessionStorage.setItem(KEY,'1');
  if(keep)localStorage.setItem(KEY,JSON.stringify({exp:Date.now()+DAYS*864e5}));
  else localStorage.removeItem(KEY);
 }catch(e){}
 return true;
}
function logout(){try{sessionStorage.removeItem(KEY);localStorage.removeItem(KEY)}catch(e){}}
function guard(){if(!ok())location.replace('index.html')}

/* 비밀번호 찾기: GitHub 토큰으로 '이 사이트 주인인지' 확인 → 맞으면 아이디/비밀번호 반환 */
function recover(token){
 token=String(token||'').trim();
 if(!/^(ghp_|github_pat_|gho_|ghu_|ghs_)?[A-Za-z0-9_]{20,}$/.test(token))return Promise.reject(new Error('토큰 형식이 올바르지 않아요.'));
 var H={Accept:'application/vnd.github+json',Authorization:'Bearer '+token};
 return fetch('https://api.github.com/user',{headers:H}).then(function(r){
  if(r.status===401)throw new Error('토큰이 올바르지 않거나 만료됐어요.');
  if(!r.ok)throw new Error('GitHub 확인 실패 ('+r.status+')');
  return r.json();
 }).then(function(u){
  if(String(u.login).toLowerCase()!==OWNER.toLowerCase())throw new Error('이 사이트 주인(@'+OWNER+')의 토큰이 아니에요.');
  return{login:u.login,id:ACC.id,pw:ACC.pw};
 });
}
W.Auth={ok:ok,login:login,logout:logout,guard:guard,recover:recover,OWNER:OWNER};
})(window);
