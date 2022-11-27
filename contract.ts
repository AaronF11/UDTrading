// Find all our documentation at https://docs.near.org
import { NearBindgen, near, call, view, UnorderedMap, initialize } from 'near-sdk-js';
//import { assert } from './utils';
import { Usuario, creditos} from './models'


@NearBindgen({})
  class CreditContract {
  usuarios = new UnorderedMap<Usuario>('map-uid-1');
  universidad: string = "udg.testnet";

  @initialize({privateFunction :true})
  init({universidad}:{universidad: string}){
    this.universidad = universidad;
  }

  @call({})
    registro({clave,carrera,centroU}:{clave:string, carrera:string, centroU: string}){
    let account_id = near.predecessorAccountId();
    let information: Usuario = {account_id:account_id, carrera: carrera, centroU: centroU};
    this.usuarios.set(clave, information);
  }

  @view({})
  get_usuarios({ from_index = 0, limit = 50 }: { from_index: number, limit: number }): Usuario[] {
    let ret: Usuario[] = []
    let end = Math.min(limit, this.usuarios.length)
    for (let i = from_index; i < end; i++) {
      const clave: string = this.usuarios.keys.get(i) as string
      const info: Usuario = this.get_usuario_por_clave({ clave })
      ret.push(info)
    }
    return ret
  }

  @view({})
  get_usuario_por_clave({ clave }: { clave: string}): Usuario {
    return {
      this.usuarios.toArray().slice(from_index, from_index + limit);
    }
  }


  @call({})
  cambiar_universidad({ universidad }:{universidad: string}) {
    let nueva_universidad = universidad;
    this.universidad = nueva_universidad;
  }

}   