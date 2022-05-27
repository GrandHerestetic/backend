// const options = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com',
//         'X-RapidAPI-Key': 'cd00fcd714mshf9223431d2d8454p1cf2a8jsn8b22ed9f222b'
//     }
// };
//
// fetch('https://online-movie-database.p.rapidapi.com/auto-complete?q=avengers', options)
//     .then(response => response.json())
//     .then(data => {
//         const list = data.d;
//
//         list.map(item => {
//             const name = item.l;
//             const poster = item.i.imageUrl;
//             const movie = `
//                     <li>
//                         <div class="card__info">
//                             <img src="${poster}" alt="" class="card__image">
//                             <p class="card__name">${name}</p>
//                         </div>
//                         <button class="btn btn-schedule">Schedule</button>
//                     </li>`;
//             document.querySelector('.films__inner').innerHTML += movie;
//         })
//     })
//     .catch(err => console.error(err));