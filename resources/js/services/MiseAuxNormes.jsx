import React from "react";
import ServicePage from "./ServicePage";
import imgNormes from "../../images/services/mise-aux-normes.jpg";

export default function MiseAuxNormes() {
  return (
    <ServicePage
      title="Mise aux normes électriques à Bordeaux Métropole (CUB)"
      subtitle="Un réseau ancien peut être dangereux. Nous remettons vos installations en conformité sur Bordeaux et toute la métropole, rapidement et sereinement."
      img={imgNormes}
      imgAlt="Mise aux normes électrique"
      h2="Sécurité et conformité NF C 15-100"
      body={
        <p className="mt-4 leading-relaxed">
          Nous réalisons un <strong className="text-white font-semibold">diagnostic complet</strong> (tableau, protections, câbles, appareillages)
          puis corrigeons les non-conformités pour réduire les risques d’incendie et d’électrocution, que vous soyez à Mérignac, Pessac, Talence, Bègles ou ailleurs dans la CUB.
        </p>
      }
      bullets={[
        "Remplacement de tableaux et interrupteurs différentiels.",
        "Mise à la terre, sections de conducteurs, repérage des circuits.",
        "Ajout de protections et de prises sécurisées."
      ]}
      note="Nous remettons vos installations aux normes pour un confort et une sécurité totale sur Bordeaux Métropole."
    />
  );
}
