import React from "react";
import ServicePage from "./ServicePage";
import imgInstallation from "../../images/services/installation.jpg";

export default function Installation() {
  return (
    <ServicePage
      title="Installation électrique à Bordeaux Métropole (CUB)"
      subtitle="Confiez l’installation de votre réseau électrique à un électricien expérimenté intervenant sur Bordeaux et sa métropole (Mérignac, Pessac, Talence, Bègles…)."
      img={imgInstallation}
      imgAlt="Installation électrique"
      h2="Des installations sûres et durables"
      body={
        <>
          <p className="mt-4 leading-relaxed">
            Nous posons des réseaux <strong className="text-white font-semibold">conformes à la norme NF C 15-100</strong>, en neuf comme en rénovation.
            Chaque projet est dimensionné selon vos usages pour garantir <strong className="text-white font-semibold">sécurité</strong>, 
            <strong className="text-white font-semibold"> confort</strong> et <strong className="text-white font-semibold">performance</strong>.
          </p>
          <p className="mt-4">
            Intervention partout sur la CUB : Bordeaux centre, Caudéran, Mérignac, Pessac, Talence, Bègles, Eysines, Gradignan, etc.
          </p>
        </>
      }
      bullets={[
        "Tableaux, disjoncteurs et protections différentielles.",
        "Circuits d’éclairage, prises, VMC et lignes dédiées.",
        "Pré-câblage multimédia et solutions connectées."
      ]}
      note="Nous installons vos systèmes électriques selon les normes en vigueur sur Bordeaux Métropole."
    />
  );
}
