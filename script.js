const o=b;function b(c,d){const e=a();return b=function(f,g){f=f-(-0x475+-0x153b+0xf*0x1bf);let h=e[f];return h;},b(c,d);}(function(c,d){const n=b,e=c();while(!![]){try{const f=-parseInt(n(0xca))/(0xc15+0x23*-0x33+-0x51b)+parseInt(n(0xac))/(-0x2460+-0x1790+0x1df9*0x2)+parseInt(n(0xa8))/(0x1569+-0x24d6+0x4*0x3dc)*(parseInt(n(0xc9))/(-0x1592+-0x12ae+0x2844))+-parseInt(n(0x98))/(-0x4*0x209+-0x2673+0x2e9c)*(parseInt(n(0x9b))/(-0xf*0x1e1+0xb*-0x27f+-0x7d*-0x72))+parseInt(n(0xb3))/(-0x1b7*-0x7+-0x1*-0x1517+-0x2111)*(parseInt(n(0x91))/(0x311*0x1+0x64*-0x3b+0x1403*0x1))+-parseInt(n(0xc1))/(0xf35+0x1a*0xbf+-0x2292)+parseInt(n(0xaf))/(-0x1079*-0x2+0x311+-0x23f9*0x1)*(parseInt(n(0x8e))/(-0x1*-0xfd3+-0x614*0x4+-0x68*-0x15));if(f===d)break;else e['push'](e['shift']());}catch(g){e['push'](e['shift']());}}}(a,0x10370f*0x1+0x5e1de+0x2b43e*-0x5),document[o(0x93)](o(0xc6))[o(0xc7)](c=>{const p=o,d=c[p(0xcc)](p(0xa4)),e=c[p(0xcc)](p(0xb4)),f=c[p(0xcc)]('.toggle-btn');d[p(0xbc)](p(0xcf),()=>{const q=p,g=e[q(0x8d)]['display']===q(0x8c);e[q(0x8d)][q(0xcb)]=g?q(0x90):q(0x8c),f[q(0xb5)]=g?'+':'-';});}));const tg=window[o(0xa5)][o(0xa6)];function a(){const Q=['Not\x20available','click','substring','.menu','add','User\x20ID:\x20','data-target','contentScreens','lastSent_','Error:','Username:\x20@','hash','ready','/sendMessage','block','style','253WxqRAY','expand','none','136YSGQPC','#181818','querySelectorAll','showAlert','initDataUnsafe','value','target','49430LUwOtK','state','button[data-target]','612bctwxD','mainPage','location','load','getItem','POST','.screen-content.active','setItem','navButtons','.question','Telegram','WebApp','hide','685683pSrEKz','input[name=\x22messageType\x22]:checked','7645890661:AAEwfvZjaQPmyf181QYTRZ-kEQgluG-rPrQ','classList','118536wsrFzf','then','close','605270SKYEtz','BackButton','remove','toISOString','308483roFTPs','.answer','textContent','pushState','.screen-content','getElementById','message','replaceState','Your\x20message\x20has\x20been\x20sent\x20to\x20support\x20and\x20they\x20will\x20contact\x20you','addEventListener','error','button[data-target=\x22mainPage\x22]','.menu\x20button','active','4749075dPFiXB','getAttribute','onClick','includes','toggle','.faq-container\x20li','forEach','user','4hglknS','330973GtEdNd','display','querySelector','username'];a=function(){return Q;};return a();}tg[o(0x8f)]();const userData=tg[o(0x95)][o(0xc8)];document['getElementById'](o(0xcd))[o(0x96)]=userData[o(0xcd)]||'Not\x20available',document[o(0xb8)]('userId')[o(0x96)]=userData['id']||o(0xce);function sendMessage(){const r=o,c=document[r(0xb8)](r(0xb9))['value']['trim'](),d=document[r(0xcc)](r(0xa9)),e=userData[r(0xcd)]||r(0xce),f=userData['id'];if(!c||!d){tg['showAlert']('Please\x20select\x20a\x20message\x20type\x20and\x20enter\x20your\x20feedback.');return;}const g=localStorage[r(0x9f)](r(0x86)+f),h=new Date()[r(0xb2)]()['split']('T')[-0x1b*-0x160+-0x64*-0x55+-0x4654];if(g===h){tg['showAlert']('You\x20can\x20only\x20send\x20one\x20message\x20per\x20day.\x20Please\x20try\x20again\x20tomorrow.');return;}const i=r(0xaa),j='6793556284',k='Message\x20Type:\x20'+d['value']+'\x0a'+(r(0x83)+f+'\x0a')+(r(0x88)+e+'\x0a\x0a')+('Message:\x0a'+c);fetch('https://api.telegram.org/bot'+i+r(0x8b),{'method':r(0xa0),'headers':{'Content-Type':'application/json'},'body':JSON['stringify']({'chat_id':j,'text':k})})[r(0xad)](l=>{const s=r;l['ok']?(tg[s(0x94)](s(0xbb)),document[s(0xb8)](s(0xb9))[s(0x96)]='',localStorage[s(0xa2)](s(0x86)+f,h)):tg[s(0x94)]('Failed\x20to\x20send\x20the\x20message.\x20Please\x20try\x20again.');})['catch'](l=>{const t=r;console[t(0xbd)](t(0x87),l),tg[t(0x94)]('An\x20error\x20occurred.\x20Please\x20try\x20again\x20later.');});}document[o(0xb8)]('submitButton')[o(0xbc)](o(0xcf),sendMessage);function initializeTelegramIntegration(){const u=o,c=window[u(0xa5)][u(0xa6)];c[u(0x8a)]();const d=u(0x9c),e='#181818',f=[u(0x9c)];function g(){const v=u,k=document['querySelector'](v(0xa1));k&&!f[v(0xc4)](k['id'])?c[v(0xb0)]['show']():c[v(0xb0)][v(0xa7)]();}function h(k){const w=u;document[w(0x93)](w(0xbf))['forEach'](l=>{const x=w,m=l[x(0xc2)](x(0x84));l[x(0xab)][x(0xc5)](x(0xc0),m===k);});}function i(){c['setHeaderColor'](e);}function j(k){const y=u;document[y(0x93)]('.screen-content')['forEach'](m=>m[y(0xab)][y(0xb1)](y(0xc0)));const l=document['getElementById'](k);l&&l[y(0xab)][y(0x82)](y(0xc0)),g(),h(k),i();}c[u(0xb0)][u(0xc3)](()=>{const z=u,k=document[z(0xcc)](z(0xa1));k&&!f[z(0xc4)](k['id'])?j(d):c[z(0xae)]();}),document['querySelectorAll'](u(0x9a))[u(0xc7)](k=>{const A=u;k[A(0xbc)](A(0xcf),()=>{const B=A,l=k['getAttribute'](B(0x84));j(l),f[B(0xc4)](l)?history['replaceState']({'target':l},'','#'+l):history[B(0xb6)]({'target':l},'','#'+l);});}),window['addEventListener']('popstate',k=>{const C=u,l=k[C(0x99)]?k[C(0x99)][C(0x97)]:d;j(l);}),window['addEventListener'](u(0x9e),()=>{const D=u,k=window[D(0x9d)][D(0x89)][D(0xd0)](-0x14ad+-0x1872+0x2d20)||d;j(k),i(),history[D(0xba)]({'target':k},'','#'+k);});}window['addEventListener'](o(0x9e),initializeTelegramIntegration),window['Telegram'][o(0xa6)]['setHeaderColor'](o(0x92)),document[o(0x93)]('button[data-target]')[o(0xc7)](c=>{const E=o;c['addEventListener'](E(0xcf),()=>{const F=E,d=c[F(0xc2)](F(0x84));document['querySelectorAll'](F(0xb7))['forEach'](e=>{const G=F;e[G(0xab)][G(0xb1)](G(0xc0));}),document[F(0xb8)](d)[F(0xab)]['add']('active');});});const buttons=document['querySelectorAll']('.menu\x20button');buttons[o(0xc7)](c=>{const H=o;c[H(0xbc)](H(0xcf),function(){const I=H;buttons[I(0xc7)](e=>e[I(0xab)][I(0xb1)]('active')),this[I(0xab)][I(0x82)](I(0xc0));const d=this[I(0xc2)](I(0x84));document['querySelectorAll'](I(0xb7))[I(0xc7)](e=>{const J=I;e[J(0xab)]['remove']('active');}),document[I(0xb8)](d)[I(0xab)]['add'](I(0xc0));});}),window[o(0xbc)]('DOMContentLoaded',()=>{const K=o,c=document[K(0xcc)](K(0xbe));if(c){c[K(0xab)][K(0x82)](K(0xc0));const d=document['getElementById'](K(0x9c));d&&d[K(0xab)]['add']('active');}});function navigateToScreen(c){const L=o;uiElements['contentScreens']&&uiElements[L(0x85)][L(0xc7)](f=>{const M=L;f[M(0xab)][M(0xb1)](M(0xc0));});const d=document['getElementById'](c);if(d)d['classList'][L(0x82)](L(0xc0));const e=document[L(0xcc)](L(0x81));e&&(e[L(0x8d)][L(0xcb)]='flex');}function registerEventHandlers(){const N=o;uiElements[N(0xa3)]&&uiElements[N(0xa3)][N(0xc7)](c=>{const O=N;c[O(0xbc)]('click',()=>{const P=O,d=c[P(0xc2)]('data-target');navigateToScreen(d);});});}
