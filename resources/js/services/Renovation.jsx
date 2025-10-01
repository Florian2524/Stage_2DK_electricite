import React from "react";
import ServicePage from "./ServicePage";
import imgRenovation from "../../images/services/renovation.jpg";

export default function Renovation() {
  return (
    <ServicePage
      title="Rénovation électrique à Bordeaux Métropole (CUB)"
      subtitle="Modernisez vos installations pour gagner en sécurité, en confort et en performance énergétique — à Bordeaux et dans toute la CUB."
      img={imgRenovation}
      imgAlt="Rénovation électrique"
      h2="Un réseau repensé pour votre quotidien"
      body={
        <p className="mt-4 leading-relaxed">
          Nous restructurons vos circuits, remplaçons les appareillages et optimisons l’éclairage pour une utilisation
          <strong className="text-white font-semibold"> pratique</strong> et <strong className="text-white font-semibold">économe</strong>, que ce soit en appartement bordelais ou en maison sur la métropole.
        </p>
      }
      bullets={[
        "Modernisation de tableaux et lignes dédiées (four, plaques, etc.).",
        "Ajout de prises, RJ45 et points lumineux selon vos usages.",
        "Éclairages LED et commandes intelligentes."
      ]}
      note="Nous rénovons vos installations pour plus de confort et de fiabilité sur Bordeaux Métropole."
    />
  );
}
