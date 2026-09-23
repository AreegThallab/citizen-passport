// No external libraries. Cards are drawn locally and downloaded as PNG.
const downloadButton = document.querySelector('#download-card');

async function loadCardFont() {
  if (!document.fonts) return;

  await Promise.all([
    document.fonts.load('400 28px "Thmanyah Sans"'),
    document.fonts.load('700 64px "Thmanyah Sans"'),
  ]);
}

async function cardBlob() {
  await loadCardFont();

  const c = document.createElement('canvas');
  c.width = 1200;
  c.height = 800;
  const x = c.getContext('2d');
  const cardFont = '"Thmanyah Sans", Tahoma, Arial, sans-serif';

  x.fillStyle = '#f5efde';
  x.fillRect(0, 0, 1200, 800);
  x.fillStyle = '#174e3b';
  x.fillRect(25, 25, 1150, 750);
  x.strokeStyle = '#d8c184';
  x.lineWidth = 2;
  x.strokeRect(50, 50, 1100, 700);

  x.textAlign = 'center';
  x.direction = 'rtl';
  x.fillStyle = '#e7d599';
  x.font = `500 28px ${cardFont}`;
  x.fillText('جــــواز المواطن • تذكار ٢٣ سبتمبر', 600, 130);

  x.font = `900 64px ${cardFont}`;
  x.fillText(downloadButton.dataset.name, 600, 275, 1000);

  x.fillStyle = '#fff9e8';
  x.font = `700 36px ${cardFont}`;
  x.fillText(`جمعت ${downloadButton.dataset.count} من ٥ أختام`, 600, 375);

  x.font = `500 26px ${cardFont}`;
  x.fillText(
    Number(downloadButton.dataset.count) === 5
      ? 'اكتملت الأختام… والبطاقة صارت جاهزة'
      : 'باقي لك محطــــات، والجــــواز ينتظرك',
    600,
    455
  );

  for (let i = 0; i < 5; i++) {
    x.beginPath();
    x.arc(360 + i * 120, 550, 30, 0, Math.PI * 2);
    x.strokeStyle = '#e7d599';
    x.stroke();
    x.fillStyle = i < Number(downloadButton.dataset.count) ? '#e7d599' : '#668472';
    x.font = `500 30px ${cardFont}`;
    x.fillText(
      i < Number(downloadButton.dataset.count) ? '✓' : '•',
      360 + i * 120,
      560
    );
  }

  x.fillStyle = '#d2d9bd';
  x.font = `400 19px ${cardFont}`;
  x.fillText('٢٣ سبتمبر • تذكار تفاعلي غير رسمي', 600, 690);

  return new Promise(resolve => c.toBlob(resolve, 'image/png'));
}

if (downloadButton) {
  downloadButton.addEventListener('click', async () => {
    const blob = await cardBlob();
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'citizen-passport.png';
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  });
}

const share = document.querySelector('#share-card');

if (share) {
  share.addEventListener('click', async () => {
    const status = document.querySelector('#share-status');
    const text = `جمعت ${downloadButton.dataset.count} من ٥ أختام في جواز المواطن 🇸🇦`;

    try {
      const blob = await cardBlob();
      const file = new File([blob], 'citizen-passport.png', { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ title: 'جواز المواطن', text, files: [file] });
      } else if (navigator.share) {
        await navigator.share({ title: 'جواز المواطن', text });
      } else if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        status.textContent = 'نُسخ نص إنجازك! حمّل البطاقة وأرفقها معه.';
      } else {
        status.textContent = text + ' — حمّل البطاقة وشاركها من جهازك.';
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        status.textContent = 'يمكنك تحميل البطاقة ومشاركتها من جهازك.';
      }
    }
  });
}

const reset = document.querySelector('#reset-form');

if (reset) {
  reset.addEventListener('submit', e => {
    if (!confirm('متأكد؟ سيتم حذف جوازك وجميع أختامك.')) e.preventDefault();
  });
}
