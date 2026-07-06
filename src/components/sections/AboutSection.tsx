const AboutSection = () => (
  <section className="about section-pad" id="about">
    <div className="container">
      <div className="eyebrow fade-up">Tentang</div>
      <div className="about__grid" style={{ marginTop: '36px' }}>
        <div className="about__quote fade-up">
          Desain yang baik terasa <span className="italic">jujur</span> — tidak berlebihan, tidak juga kurang.
        </div>
        <div className="about__body">
          <p className="fade-up">
            Selama lebih dari enam tahun, saya membantu studio, startup, dan brand menerjemahkan ide menjadi antarmuka yang rapi dan berkarakter. Latar belakang saya di desain editorial mengajarkan saya bahwa tipografi dan jarak bukan hiasan — itu cara pesan disampaikan.
          </p>
          <p className="fade-up">
            Saya percaya detail kecil — jeda animasi, kontras warna, rasio antar elemen — adalah pembeda antara produk yang biasa dengan produk yang diingat orang.
          </p>
        </div>
      </div>
      <div className="about__stats">
        <div className="stat">
          <div className="stat__num">
            <span className="count" data-target="6">0</span>
            <span className="accentmark">+</span>
          </div>
          <div className="stat__label">Tahun Pengalaman</div>
        </div>
        <div className="stat">
          <div className="stat__num">
            <span className="count" data-target="48">0</span>
          </div>
          <div className="stat__label">Proyek Diselesaikan</div>
        </div>
        <div className="stat">
          <div className="stat__num">
            <span className="count" data-target="22">0</span>
          </div>
          <div className="stat__label">Klien di 3 Benua</div>
        </div>
        <div className="stat">
          <div className="stat__num">
            <span className="count" data-target="12">0</span>
          </div>
          <div className="stat__label">Penghargaan Desain</div>
        </div>
      </div>
    </div>
  </section>
)

export default AboutSection
