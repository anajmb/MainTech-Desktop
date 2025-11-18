// import { formatDistanceToNow } from 'date-fns'
// import { ptBR } from 'date-fns/locale'

// type TempoDaPublicacaoProps = {
//   criacao: string | Date;
// };

// export default function TempoDaPublicacao({ criacao }: TempoDaPublicacaoProps) {
//   const data = new Date(criacao);
//   if (isNaN(data.getTime())) {
//     return <span>Data inválida</span>;
//   }
//   return (
//     <span>
//       {formatDistanceToNow(data, { addSuffix: true, locale: ptBR })}
//     </span>
//   )
// }