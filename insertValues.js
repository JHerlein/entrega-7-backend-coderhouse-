const {options} = require('./options/mariaDB')
var knex = require('knex')(options)

mensajes = [
    {
      author: "aserejeo@yahoo.com.ar",
      text: "como va?",
      time: "2022-04-05T02:33:43.300Z"
    },
    {
      author: "js@gmail.com",
      text: "que ondi",
      time: "2022-04-05T02:33:57.859Z"
    },
    {
      author: "jol@hotmail.com",
      text: "que onda perroooo",
      time: "2022-04-05T02:34:05.031Z"
    },
    {
      author: "asd@hotmail.com",
      text: "holix",
      time: "2022-04-05T02:46:30.202Z"
    },
    {
      author: "asd@hotmail.com",
      text: "holi",
      time: "2022-04-05T14:23:50.318Z"
    },
    {
      author: "asd@hotmail.com",
      text: "123",
      time: "2022-04-05T17:16:25.270Z"
    }
  ]

productos = [
  {
    title: "Hamburgesa",
    price: "5",
    thumbnail: "https://cdn3.iconfinder.com/data/icons/street-food-and-food-trucker-1/64/hamburger-fast-food-patty-bread-128.png",
    
  },
  {
    title: "Pizza",
    price: "3",
    thumbnail: "https://cdn3.iconfinder.com/data/icons/street-food-and-food-trucker-1/64/pizza-fast-food-bake-bread-128.png",
    
  },
  {
    title: "Pollo",
    price: "6",
    thumbnail: "https://cdn3.iconfinder.com/data/icons/street-food-and-food-trucker-1/64/fried-chicken-thigh-fast-food-128.png",
    
  },
  {
    title: "Arroz",
    price: "1",
    thumbnail: "https://cdn3.iconfinder.com/data/icons/street-food-and-food-trucker-1/64/rice-dish-food-cook-menu-128.png",
    
  }
]

//insert
knex('productos').insert(productos)
.then(() => console.log('data inserted'))
.finally(() => {
    knex.destroy();
});


//select
// knex.from('mensajes').select('*')
// .then((rows) => {
//   console.log(rows)
// })
// .finally(()=>{
//   knex.destroy()
// })

// //delete

// knex.from('mensajes').where('id','>',6).del()
// .then(() => {console.log('Mensaje borrado')})
// .finally(() => {
//   knex.destroy()
// })
  
