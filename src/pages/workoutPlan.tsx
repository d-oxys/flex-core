import React, { ChangeEvent, FormEvent, useState } from 'react';

type WorkoutPlan = {
  nama: string;
  fotoWO: string;
  waktuLatihan: string;
  kategori: string;
  funFacts: string;
  energiYangDigunakan: string[];
  alat: string[];
  tutorial: string[];
};

const WorkOutPlan = () => {
  const [workout, setWorkout] = useState<WorkoutPlan>({
    nama: '',
    fotoWO: '',
    waktuLatihan: '',
    kategori: '',
    funFacts: '',
    energiYangDigunakan: [],
    alat: [],
    tutorial: [],
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWorkout({ ...workout, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWorkout({ ...workout, [e.target.name]: e.target.value.split(',') });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/workout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workout),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      console.log(data);
      alert(data.message); // Menggunakan pesan dari respons API
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        alert(error.message); // Menampilkan pesan kesalahan dari API
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='nama'>Nama:</label>
      <input id='nama' name='nama' type='text' onChange={handleChange} value={workout.nama} />

      <label htmlFor='fotoWO'>Foto WO:</label>
      <input id='fotoWO' name='fotoWO' type='text' onChange={handleChange} value={workout.fotoWO} />

      <label htmlFor='waktuLatihan'>Waktu Latihan:</label>
      <input id='waktuLatihan' name='waktuLatihan' type='text' onChange={handleChange} value={workout.waktuLatihan} />

      <label htmlFor='kategori'>Kategori:</label>
      <input id='kategori' name='kategori' type='text' onChange={handleChange} value={workout.kategori} />

      <label htmlFor='funFacts'>Fun Facts:</label>
      <input id='funFacts' name='funFacts' type='text' onChange={handleChange} value={workout.funFacts} />

      <label htmlFor='energiYangDigunakan'>Energi Yang Digunakan:</label>
      <input id='energiYangDigunakan' name='energiYangDigunakan' type='text' onChange={handleArrayChange} value={workout.energiYangDigunakan.join(',')} />

      <label htmlFor='alat'>Alat:</label>
      <input id='alat' name='alat' type='text' onChange={handleArrayChange} value={workout.alat.join(',')} />

      <label htmlFor='tutorial'>Tutorial:</label>
      <input id='tutorial' name='tutorial' type='text' onChange={handleArrayChange} value={workout.tutorial.join(',')} />

      <button type='submit'>Submit</button>
    </form>
  );
};

export default WorkOutPlan;
