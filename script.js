
// Play rocket sound on a 5-second loop with a 2-second sound.
// Show a small 'Launching...' loader during the 2-second sound and for 5 seconds repeat.
const audio = document.getElementById('rocketSound');
const loader = document.getElementById('loader');

let first = true;

function playCycle(){
  // show loader for duration of sound (2s)
  loader.classList.remove('hidden');
  // try to play audio; some browsers require user interaction for autoplay with sound.
  audio.currentTime = 0;
  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // Autoplay blocked: fallback - mute audio then play to allow loop, then unmute after user interaction.
      audio.muted = true;
      audio.play().catch(()=>{});
      // show small prompt to click to enable sound
      createEnableButton();
    });
  }
  // hide loader after 2s
  setTimeout(()=> loader.classList.add('hidden'), 2000);
}

// schedule cycle every 5 seconds; start immediately once page loads
window.addEventListener('load', ()=>{
  playCycle();
  setInterval(playCycle, 5000);
});

// create enable button if autoplay blocked
function createEnableButton(){
  if (document.getElementById('enableSoundBtn')) return;
  const btn = document.createElement('button');
  btn.id = 'enableSoundBtn';
  btn.innerText = 'Enable Sound';
  btn.style.position='fixed';
  btn.style.left='50%';
  btn.style.bottom='6%';
  btn.style.transform='translateX(-50%)';
  btn.style.padding='10px 16px';
  btn.style.borderRadius='8px';
  btn.style.background='rgba(52,240,255,0.08)';
  btn.style.color='var(--neon)';
  btn.style.border='1px solid rgba(52,240,255,0.12)';
  btn.style.fontWeight='700';
  btn.style.zIndex=9999;
  btn.onclick = ()=>{
    audio.muted = false;
    audio.play().catch(()=>{});
    btn.remove();
  };
  document.body.appendChild(btn);
}

// SEO: set canonical and structured data for better indexing
(function addStructuredData(){
  const ld = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "MeewX Crypto Rocket",
    "url": "https://www.meewx.io/",
    "description": "MeewX Crypto Rocket — The meme cat coin preparing to launch to the moon."
  };
  const s = document.createElement('script');
  s.type='application/ld+json';
  s.text = JSON.stringify(ld);
  document.head.appendChild(s);
})();
