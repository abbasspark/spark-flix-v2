import { Genre } from "../types/tmdb.type";

export function get_Genres(item: any = {}, tvgenres: Genre[] = [], movieGenres: Genre[] = []) {
  if (item.type === "TV") {
    return tvgenres.filter((el) => {
      return item.genre_ids.some((f: any) => {
        return f === el.id;
      });
    });
  }

  return movieGenres.filter((el) => {
    return item.genre_ids.some((f: any) => {
      return f === el.id;
    });
  });
}
