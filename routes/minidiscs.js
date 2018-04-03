const express = require('express')
const router = express.Router()
const knex = require('../knex')
// READ ALL records for this table
router.get('/', (req, res, next) => {
  knex('minidiscs')
    .then((rows) => {
      res.json(rows)
    })
    .catch((err) => {
      next(err)
    })
})
// READ ONE record for this table
router.get('/:id', (req, res, next) => {
  knex('minidiscs')
    .where('id', req.params.id)
    .then((rows) => {
      res.json(rows)
    })
    .catch((err) => {
      next(err)
    })
})


// CREATE ONE record for this table
router.post('/', (req, res, next) => {
  knex('minidiscs')
    .insert({
      title: 'Rooster',
      artist: 'Alice in Chains',
      genre: 'Rock',
      description: 'He aint gonna die',
      cover_url: 'aliceinchains.url'
    })
    .returning('*')
    .then((data) => {
      res.json(data[0])
    })
    .catch((err) => {
      next(err)
    })
})
// UPDATE ONE record for this table
router.put('/:id', (req, res, next) => {
  knex('minidiscs')
    .where('id', req.params.id)
    .then((data) => {
      knex('minidiscs')
        .where('id', req.params.id)
        .limit(1)
        .update({
          title: 'i cant remember',
          artist: 'candlebox',
          genre: 'rock',
          description: 'some 90s lyrics',
          cover_url: 'candlebox.url'
        })
        .returning('*')
        .then((data) => {
          res.json(data[0])
        })
    })
    .catch((err) => {
      next(err)
    })
})
// DELETE ONE record for this table
router.delete('/:id', (req, res, next) => {
  knex('minidiscs')
  .where('id', req.params.id)
  .first()
  .then((row) => {
    if (!row) return next()
    knex('minidiscs')
    .del()
    .where('id', req.params.id)
    .then(() => {
      res.send(`ID ${req.params.id} Deleted`)
    })
  })
  .catch((err) => {
    next(err)
  })
})


module.exports = router
