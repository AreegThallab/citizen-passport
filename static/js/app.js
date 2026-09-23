// No external libraries. Cards are drawn locally and downloaded as PNG.

const downloadButton = document.querySelector('#download-card');

async function loadCardFont() {
  if (!document.fonts) return;

  await Promise.all([
    document.fonts.load('400 24px "Thmanyah Sans"'),
    document.fonts.load('500 28px "Thmanyah Sans"'),
    document.fonts.load('700 36px "Thmanyah Sans"'),
    document.fonts.load('900 64px "Thmanyah Sans"'),
  ]);
}

async function cardBlob() {
  await loadCardFont();

  const c = document.createElement('canvas');
  c.width = 1200;
  c.height = 800;

  const x = c.getContext('2d');
  const cardFont = '"Thmanyah Sans", Tahoma, Arial, sans-serif';
  const count = Number(downloadButton.dataset.count);

  // Background
  x.fillStyle = '#f5efde';
  x.fillRect(0, 0, 1200, 800);

  // Main card
  x.fillStyle = '#174e3b';
  x.fillRect(25, 25, 1150, 750);

  // Border
  x.strokeStyle = '#d8c184';
  x.lineWidth = 2;
  x.strokeRect(50, 50, 1100, 700);

  // Canvas text settings
  x.textAlign = 'center';
  x.direction = 'rtl';

  // Header
  x.fillStyle = '#e7d599';
  x.font = `500 28px ${cardFont}`;
  x.fillText('جــــواز المواطن • اليوم الوطني السعودي ٩٦', 600, 130);

  // Name
  x.font = `900 64px ${cardFont}`;
  x.fillText(downloadButton.dataset.name, 600, 275, 1000);

  // Progress
  x.fillStyle = '#fff9e8';
  x.font = `700 36px ${cardFont}`;
  x.fillText(`جمعــــت ${count} من ٥ أختــــام`, 600, 375);

  // Status text
  x.font = `500 26px ${cardFont}`;
  x.fillText(
    count === 5
      ? 'اكتملــــت الأختــــام… وصارت بطاقتــــك جاهــــزة'
      : 'باقي لك محطــــات… والجــــواز بانتظارك',
    600,
    455
  );

  // Stamps row
  for (let i = 0; i < 5; i++) {
    x.beginPath();
    x.arc(360 + i * 120, 550, 30, 0, Math.PI * 2);
    x.strokeStyle = '#e7d599';
    x.lineWidth = 2;
    x.stroke();

    x.fillStyle = i < count ? '#e7d599' : '#668472';
    x.font = `500 30px ${cardFont}`;
    x.fillText(
      i < count ? '✓' : '•',
      360 + i * 120,
      560
    );
  }

  // Footer
  x.fillStyle = '#d2d9bd';
  x.font = `400 19px ${cardFont}`;
  x.fillText('٢٣ سبتمبر • تذكــــار تفاعلي غير رسمي', 600, 690);

  return new Promise(resolve => c.toBlob(resolve, 'image/png'));
}

// Download
if (downloadButton) {
  downloadButton.addEventListener('click', async () => {
    const blob = await cardBlob();
    if (!blob) return;

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'citizen-passport-96.png';
    a.click();

    setTimeout(() => URL.revokeObjectURL(url), 10000);
  });
}

// Share
const share = document.querySelector('#share-card');

if (share) {
  share.addEventListener('click', async () => {
    const status = document.querySelector('#share-status');
    const count = Number(downloadButton.dataset.count);
    const text =
      `جمعــــت ${count} من ٥ أختــــام في جــــواز المواطن 🇸🇦 ` +
      `ضمن تجربة اليوم الوطني السعودي ٩٦`;

    try {
      const blob = await cardBlob();
      const file = new File([blob], 'citizen-passport-96.png', {
        type: 'image/png',
      });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'جــــواز المواطن',
          text,
          files: [file],
        });
      } else if (navigator.share) {
        await navigator.share({
          title: 'جــــواز المواطن',
          text,
        });
      } else if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        status.textContent = 'تم نسخ نص الإنجاز. حمّل البطاقة وأرفقها مع المشاركة.';
      } else {
        status.textContent = text + ' — حمّل البطاقة وشاركها من جهازك.';
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        status.textContent = 'يمكنك تحميل البطاقة ومشاركتها مباشرة من جهازك.';
      }
    }
  });
}

// Reset
const reset = document.querySelector('#reset-form');

if (reset) {
  reset.addEventListener('submit', e => {
    if (!confirm('متأكد؟ سيتم حذف جــــوازك وجميع أختامك نهائيًا.')) {
      e.preventDefault();
    }
  });
}