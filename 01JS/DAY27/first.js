 
    // Zodiac definitions: ranges and a short summary + element/quality
    const zodiacs = [
      {name:'Capricorn', start:[12,22], end:[1,19], element:'Earth', quality:'Cardinal', emoji:'♑', desc:'Practical, disciplined and ambitious. You aim for steady progress and long-term gains.'},
      {name:'Aquarius', start:[1,20], end:[2,18], element:'Air', quality:'Fixed', emoji:'♒', desc:'Independent, inventive and humanitarian. You value freedom and original ideas.'},
      {name:'Pisces', start:[2,19], end:[3,20], element:'Water', quality:'Mutable', emoji:'♓', desc:'Compassionate, imaginative and intuitive. You often sense what others feel.'},
      {name:'Aries', start:[3,21], end:[4,19], element:'Fire', quality:'Cardinal', emoji:'♈', desc:'Bold, energetic and direct. You like to lead and take initiative.'},
      {name:'Taurus', start:[4,20], end:[5,20], element:'Earth', quality:'Fixed', emoji:'♉', desc:'Grounded, patient and sensuous. You appreciate comfort and reliability.'},
      {name:'Gemini', start:[5,21], end:[6,20], element:'Air', quality:'Mutable', emoji:'♊', desc:'Curious, versatile and communicative. You enjoy learning and variety.'},
      {name:'Cancer', start:[6,21], end:[7,22], element:'Water', quality:'Cardinal', emoji:'♋', desc:'Caring, protective and emotionally attuned. Family and home matter to you.'},
      {name:'Leo', start:[7,23], end:[8,22], element:'Fire', quality:'Fixed', emoji:'♌', desc:'Confident, generous and dramatic. You enjoy being seen and celebrated.'},
      {name:'Virgo', start:[8,23], end:[9,22], element:'Earth', quality:'Mutable', emoji:'♍', desc:'Analytical, service-minded and detail-focused. You refine what you touch.'},
      {name:'Libra', start:[9,23], end:[10,22], element:'Air', quality:'Cardinal', emoji:'♎', desc:'Diplomatic, artistic and fairness-driven. You seek harmony in relationships.'},
      {name:'Scorpio', start:[10,23], end:[11,21], element:'Water', quality:'Fixed', emoji:'♏', desc:'Intense, perceptive and transformative. You navigate depth and hidden truth.'},
      {name:'Sagittarius', start:[11,22], end:[12,21], element:'Fire', quality:'Mutable', emoji:'♐', desc:'Adventurous, philosophical and freedom-loving. You chase meaning and growth.'}
    ];

    function getZodiac(day, month){
      // month: 1-12, day: 1-31
      for(const z of zodiacs){
        const [sM, sD] = z.start;
        const [eM, eD] = z.end;
        if (sM === eM) {
          if (month === sM && day >= sD && day <= eD) return z;
        } else {
          // spans year boundary (Capricorn)
          if ((month === sM && day >= sD) || (month === eM && day <= eD)) return z;
        }
        // regular ranges where start month < end month
        if (sM < eM){
          if ((month === sM && day >= sD) || (month === eM && day <= eD) || (month > sM && month < eM)) return z;
        }
      }
      return null;
    }

    function randomInt(min,max){ return Math.floor(Math.random()*(max-min+1))+min }

    // form interaction
    const form = document.getElementById('astroForm');
    const readBtn = document.getElementById('readBtn');
    const clearBtn = document.getElementById('clearBtn');
    const first = document.getElementById('first');
    const last = document.getElementById('last');
    const dateIn = document.getElementById('date');
    const monthIn = document.getElementById('month');
    const yearIn = document.getElementById('year');

    const chipSign = document.getElementById('chip-sign');
    const chipElement = document.getElementById('chip-element');
    const chipQuality = document.getElementById('chip-quality');
    const zodiacPlaceholder = document.getElementById('zodiacPlaceholder');
    const detailArea = document.getElementById('detailArea');
    const shareBtn = document.getElementById('shareBtn');

    function showResult(person, z){
      chipSign.textContent = 'Sign: ' + z.name;
      chipElement.textContent = 'Element: ' + z.element;
      chipQuality.textContent = 'Quality: ' + z.quality;

      zodiacPlaceholder.innerHTML = `
        <div class="z-icon" aria-hidden>${z.emoji}</div>
        <div class="z-info">
          <p class="z-title">${z.name} — ${person}</p>
          <p class="z-sub">${z.element} • ${z.quality}</p>
          <p class="z-desc">${z.desc}</p>
        </div>
      `;

      // Compose a friendly daily tip and lucky numbers
      const luckies = [randomInt(1,9), randomInt(1,31), randomInt(1,99)];
      const dailyTips = [
        'This is a good day to start a small routine that strengthens focus.',
        'Reach out to an old friend — a short message can brighten both your days.',
        'Try to pause and breathe deeply before making a decision today.',
        'Small acts of service will return bigger emotional rewards than you expect.'
      ];

      const tip = dailyTips[randomInt(0,dailyTips.length-1)];

      detailArea.innerHTML = `
        <div style="display:flex; gap:10px; flex-wrap:wrap">
          <div class="chip">Lucky: ${luckies.join(', ')}</div>
          <div class="chip">Mood: ${['Calm','Optimistic','Curious','Bold'][randomInt(0,3)]}</div>
        </div>
        <div style="margin-top:10px">📜 <strong>Daily tip:</strong> ${tip}</div>
        <div style="margin-top:10px; color:var(--muted); font-size:13px">Note: This is a simple sun-sign based snapshot for fun and reflection.</div>
      `;
    }

    function resetPreview(){
      chipSign.textContent = 'Sign: —';
      chipElement.textContent = 'Element: —';
      chipQuality.textContent = 'Quality: —';
      zodiacPlaceholder.innerHTML = `<div class="z-icon">✨</div><div class="z-info"><p class="z-title">Welcome to AstroSight</p><p class="z-sub">Fill the form and click Reveal my sign to get your personalised snapshot.</p></div>`;
      detailArea.innerHTML = '';
    }

    readBtn.addEventListener('click', ()=>{
      // minimal validation
      const f = first.value.trim();
      const l = last.value.trim();
      const d = parseInt(dateIn.value,10);
      const m = parseInt(monthIn.value,10);
      const y = parseInt(yearIn.value,10);

      if(!f){ first.focus(); return alert('Please enter your first name.') }
      if(!d || !m || !y){ return alert('Please enter a valid date, month and year.') }
      if(d < 1 || d > 31){ return alert('Date must be between 1 and 31.') }
      if(m < 1 || m > 12){ return alert('Please select a valid month.') }
      if(y < 1900 || y > 2099){ return alert('Please enter a reasonable year.') }

      // rudimentary check for month-day combination
      const mdays = [31, ( (y%4===0 && y%100!==0) || (y%400===0) )?29:28, 31,30,31,30,31,31,30,31,30,31];
      if(d > mdays[m-1]){ return alert('The selected month does not have that date.') }

      const z = getZodiac(d,m);
      const person = `${f}${l? ' ' + l: ''} (${d}-${m}-${y})`;
      if(!z){ alert('Could not determine zodiac.'); return }
      showResult(person, z);

      // small visual highlight
      zodiacPlaceholder.animate([{transform:'scale(0.98)'},{transform:'scale(1)'}], {duration:380, easing:'cubic-bezier(.2,.9,.3,1)'});
    });

    clearBtn.addEventListener('click', ()=>{ first.value=''; last.value=''; dateIn.value=''; monthIn.value=''; yearIn.value=''; resetPreview(); });

    shareBtn.addEventListener('click', async ()=>{
      const signText = chipSign.textContent + ' — ' + (document.querySelector('.z-title')?.textContent || '—');
      const details = detailArea.textContent || '';
      const payload = `${signText}\n${details}`;
      try{
        await navigator.clipboard.writeText(payload);
        shareBtn.textContent = 'Copied!';
        setTimeout(()=> shareBtn.textContent = 'Copy Snapshot', 1600);
      }catch(e){
        alert('Could not copy — your browser may block clipboard access.');
      }
    });

    // initialize
    resetPreview();
 