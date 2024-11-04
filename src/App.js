import React, { useState } from 'react';

const App = () => {
    const [sisiPersegi, setSisiPersegi] = useState('');
    const [sisiKubus, setSisiKubus] = useState('');
    const [outputLuasPersegi, setOutputLuasPersegi] = useState('-');
    const [outputLuasPermukaanKubus, setOutputLuasPermukaanKubus] = useState('-');

    // Fungsi untuk memanggil service luas persegi
    const hitungLuasPersegi = async () => {
        const rusuk = parseFloat(sisiPersegi);
        if (isNaN(rusuk) || rusuk <= 0 || !Number.isInteger(rusuk)) {
            alert("Masukkan panjang rusuk yang valid untuk luas persegi.");
            return;
        }

        try {
            const response = await fetch(`http://18.208.247.155:8080/function/luas-persegi`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rusuk }),
            });
            const result = await response.json();
            setOutputLuasPersegi(result.luas || "Error");
        } catch (error) {
            console.error('Error:', error);
            alert("Gagal memanggil service luas persegi.");
        }
    };

    // Fungsi untuk memanggil service luas permukaan kubus
    const hitungLuasPermukaanKubus = async () => {
        const rusuk = parseFloat(sisiKubus);
        if (isNaN(rusuk) || rusuk <= 0 || !Number.isInteger(rusuk)) {
            alert("Masukkan panjang rusuk yang valid untuk luas permukaan kubus.");
            return;
        }

        try {
            const response = await fetch(`http://18.208.247.155:8080/function/luas-permukaan-kubus`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rusuk }),
            });
            const result = await response.json();
            setOutputLuasPermukaanKubus(result.luasPermukaanKubus || "Error");
        } catch (error) {
            console.error('Error:', error);
            alert("Gagal memanggil service luas permukaan kubus.");
        }
    };

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
          <div style={{ maxWidth: '80%', padding: '20px', textAlign: 'center' }}>
  
              {/* Container for side-by-side cards */}
              <div style={{ display: 'flex', justifyContent: 'space-around', gap: '80px', textAlign: 'center' }}>
  
                  {/* Card for Square Area */}
                  <div style={{ flex: '1' }}>
                      <h2>Luas Persegi</h2>
                      <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', padding: '20px', textAlign: 'center' }}>
                          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                              <input
                                  type="number"
                                  id="sisiPersegi"
                                  placeholder="Masukkan panjang sisi"
                                  required
                                  value={sisiPersegi}
                                  onChange={(e) => setSisiPersegi(e.target.value)}
                                  style={{ width: '70%', padding: '8px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '4px' }}
                              />
                              <button onClick={hitungLuasPersegi} style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer', borderRadius: '4px'}}>
                                  Enter
                              </button>
                          </div>
                          <div style={{ color: '#333', padding: '20px' }}>
                              Hasil: <span>{outputLuasPersegi}</span> cm²
                          </div>
                      </div>
                  </div>
  
                  {/* Card for Cube Surface Area */}
                  <div style={{ flex: '1' }}>
                      <h2>Luas Permukaan Kubus</h2>
                      <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', padding: '20px', textAlign: 'center' }}>
                          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                              <input
                                  type="number"
                                  id="sisiKubus"
                                  placeholder="Masukkan panjang rusuk"
                                  required
                                  value={sisiKubus}
                                  onChange={(e) => setSisiKubus(e.target.value)}
                                  style={{ width: '70%', padding: '8px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '4px' }}
                              />
                              <button onClick={hitungLuasPermukaanKubus} style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer', borderRadius: '4px'}}>
                                  Enter
                              </button>
                          </div>
                          <div style={{ color: '#333', padding: '20px' }}>
                              Hasil: <span>{outputLuasPermukaanKubus}</span> cm²
                          </div>
                      </div>
                  </div>
  
              </div>
          </div>
      </div>
  );  
};

export default App;
