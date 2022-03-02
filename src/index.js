document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/pups', {
    headers: { accept: 'appplication.json' },
  })
    .then((res) => res.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        const dogSpan = document.createElement('span');
        dogSpan.innerText = data[i].name;
        document.getElementById('dog-bar').appendChild(dogSpan);
      }

      const dogs = document.getElementsByTagName('span');
      console.log(dogs);
      for (let i = 0; i < 10; i++) {
        dogs[i].addEventListener('click', (e) => {
          dogDiv = document.getElementById('dog-info');

          const dogImg = document.createElement('img');
          dogImg.src = data[i].image;
          dogDiv.appendChild(dogImg);

          const dogName = document.createElement('h2');
          dogName.innerText = data[i].name;
          dogDiv.appendChild(dogName);

          const dogButton = document.createElement('button');
          if (data[i].isGoodDog) {
            dogButton.innerText = 'Good Dog!';
          } else {
            dogButton.innerText = 'Bad Dog!';
          }
          dogDiv.appendChild(dogButton);

          dogButton.addEventListener('click', (e) => {
            if (data[i].isGoodDog) {
              fetch(`http://localhost:3000/pups/${data[i].id}`, {
                method: 'PATCH',
                headers: {
                  accept: 'appplication.json',
                  'Content-type': 'application/json; charset=UTF-8',
                },
                //prettier-ignore
                body: JSON.stringify({ 'isGoodDog': false }),
              });
            } else {
              fetch(`http://localhost:3000/pups/${data[i].id}`, {
                method: 'PATCH',
                headers: {
                  accept: 'appplication.json',
                  'Content-type': 'application/json; charset=UTF-8',
                },
                //prettier-ignore
                body: JSON.stringify({ 'isGoodDog': true }),
              });
              // .then((res) => res.json())
              // .then((data) => console.log(data));
              console.log(data[i].isGoodDog);
            }
          });
        });
      }
      const dogFilter = document.getElementById('good-dog-filter');
      let filter = false;
      dogFilter.addEventListener('click', (e) => {
        const dogs = document.getElementsByTagName('span');
        if (filter === false) {
          for (let i = 0; i < data.length; i++) {
            if (!data[i].isGoodDog) {
              dogs[i].style = 'display: none';
            }
          }
          filter = true;
        } else {
          for (let i = 0; i < data.length; i++) {
            if (!data[i].isGoodDog) {
              dogs[i].style = 'display:inline';
            }
          }
          filter = false;
        }
      });
    });
});
