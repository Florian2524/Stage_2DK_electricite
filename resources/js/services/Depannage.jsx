import React from "react";
import ServicePage from "./ServicePage";
import imgDepannage from "../../images/services/depannage.jpg";

export default function Depannage() {
  return (
    <ServicePage
      title="Dépannage électrique à Bordeaux Métropole (CUB)"
      subtitle="Panne de courant, tableau qui saute, prise défectueuse ? Intervention rapide sur Bordeaux, Mérignac, Pessac, Talence, Bègles et alentours."
      img={imgDepannage}
      imgAlt="Dépannage électrique"
      h2="Intervention rapide et sécurisée"
      body={
        <p className="mt-4 leading-relaxed">
          Nous diagnostiquons l’origine de la panne et remettons votre installation en service en respectant les
          <strong className="text-white font-semibold"> normes de sécurité</strong> : remplacement de disjoncteurs, recherche de défauts d’isolement, réparation de câbles, etc.
        </p>
      }
      bullets={[
        "Diagnostic précis du tableau et des circuits.",
        "Réparation/Remplacement des éléments défectueux.",
        "Conseils pour éviter les pannes à l’avenir."
      ]}
      note="Nous assurons un dépannage rapide et efficace sur Bordeaux Métropole."
    />
  );
}

