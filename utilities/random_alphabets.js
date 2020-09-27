function get_random_alphabet() {
  const alphabet_list = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const index = Math.floor(Math.random() * alphabet_list.length)
  const alphabet = alphabet_list[index]

  return alphabet
}

module.exports = {
  get_series_random_string: function (string_length) {
    let random_string = ''
    for (let i = 0; i < string_length; i++) {
      random_string = random_string + get_random_alphabet()
    }

    return random_string
  }
}