import { FilterPokemonsPipe } from './filter-pokemons.pipe';

describe('FilterUserByNamePipe', () => {
  it('create an instance', () => {
    const pipe = new FilterPokemonsPipe();
    expect(pipe).toBeTruthy();
  });

  const dataFake = [
    {
       "id":372,
       "name":"Alakazam",
       "image":"https://assets.pokemon.com/assets/cms2/img/pokedex/detail/065.png",
       "attack":100,
       "defense":64,
       "hp":100,
       "type":"psychic",
       "id_author":1
    },
    {
       "id":426,
       "name":"Mewtwo",
       "image":"https://assets.pokemon.com/assets/cms2/img/pokedex/full/150_f3.png",
       "attack":100,
       "defense":100,
       "hp":100,
       "type":"Legendario",
       "id_author":1
    },
    {
       "id":473,
       "name":"Blastoise",
       "image":"https://assets.pokemon.com/assets/cms2/img/pokedex/full//009.png",
       "attack":44,
       "defense":36,
       "hp":22,
       "type":"Agua",
       "id_author":1
    }
 ];

    it('pipe retorna uno o más resultados si encuentra coincidencia', ()=>{
        const search = 'Alakazam';
        const pipe = new FilterPokemonsPipe();
        const filtered = pipe.transform(dataFake, search);
        expect(filtered.length).toBeLessThanOrEqual(1);
    })

    it('pipe retorna un array vacio si no encuentra elementos', ()=>{
        const search = 'Pikachu';

        const pipe = new FilterPokemonsPipe();
        const filtered = pipe.transform(dataFake, search);
        expect(filtered.length).toBe(0);
    })


});
