const AboutSection = () => (
  <section className="about section-pad" id="about">
    <div className="container">
      <div className="eyebrow fade-up">Tentang Saya</div>
      <div className="about__grid" style={{ marginTop: '36px' }}>
        <div className="about__quote fade-up">
          Saya berasal dari Medan, lahir pada <span className="italic">22 Mei 2009</span>, dan tumbuh dari rasa penasaran yang kuat terhadap teknologi.
        </div>
        <div className="about__body">
          <p className="fade-up">
            Saya Valerie Attila Al-fath, seorang siswa kelas 12 jurusan Rekayasa Perangkat Lunak di SMK Multi Karya Medan. Ketertarikan saya terhadap pemrograman dimulai sejak SMP, ketika saya mulai tertarik pada cara kerja sistem digital melalui pengalaman bermain game dan mempelajari tutorial pemrograman dasar.
          </p>
          <p className="fade-up">
            Saat ini, saya berfokus pada pengembangan web modern yang cepat, interaktif, dan terstruktur. Saya juga pernah menjalani Praktik Kerja Lapangan di Miloqu, perusahaan kecil yang didirikan oleh alumni SMK Multi Karya, dan dari pengalaman tersebut saya memperoleh wawasan yang berharga mengenai proses kerja profesional di bidang teknologi.
          </p>
          <p className="fade-up">
            Ke depannya, saya bercita-cita melanjutkan pendidikan di Universitas Sumatera Utara melalui jurusan Teknik Elektro untuk memperluas wawasan serta mengembangkan kemampuan secara mandiri di bidang teknologi.
          </p>
        </div>
      </div>
      <div className="about__stats">
        <div className="stat">
          <div className="stat__num">
            <span className="count" data-target="17">0</span>
          </div>
          <div className="stat__label">Usia</div>
        </div>
        <div className="stat">
          <div className="stat__num">
            <span className="count" data-target="8">0</span>
          </div>
          <div className="stat__label">Project yang Dibangun</div>
        </div>
        <div className="stat">
          <div className="stat__num">
            <span className="count" data-target="1">0</span>
          </div>
          <div className="stat__label">Pengalaman PKL</div>
        </div>
        <div className="stat">
          <div className="stat__num">
            <span className="count" data-target="6">0</span>
            <span className="accentmark">+</span>
          </div>
          <div className="stat__label">Tech Stack Utama</div>
        </div>
      </div>
    </div>
  </section>
)

export default AboutSection
