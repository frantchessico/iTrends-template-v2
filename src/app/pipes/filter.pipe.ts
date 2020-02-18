import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {

    const resultPosts = [];
    for (const post of value ) {
      if (
        post.titulo.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        post.cidade.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        post.categorias.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        post.createdAt.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        post.provincia.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        post.situacao.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        post.userUid.toLowerCase().indexOf(arg.toLowerCase()) > -1
      ) {
        resultPosts.push(post);
      }

    }

    return resultPosts;
  }

}
