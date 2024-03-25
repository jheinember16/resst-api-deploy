const z = require('zod')

const movieShema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
    requerid_error: 'Movie title is requerid.'
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5),
  poster: z.string().url({
    message: 'Poster must be a valid URL'
  }),
  genre: z.array(
    z.enum(['Action', 'Adventure', 'Crime',
      'Comedy', 'Drama', 'Fantasy',
      'Horror', 'Thriller', 'Sci-Fi']),
    {
      requerid_error: 'Movie genre is requerid',
      invalid_type_error: 'Movie genre must be an array of enum Genre'
    }
  )
})

function validateMovie (input) {
  return movieShema.safeParse(input)
}

function validatePartialMovie (input) {
  return movieShema.partial().safeParse(input)
}

module.exports = {
  validateMovie,
  validatePartialMovie
}
