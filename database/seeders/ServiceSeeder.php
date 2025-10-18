<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use App\Models\Service;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $cols = Schema::getColumnListing('services');

        // Helper: ne garder que les colonnes réellement présentes
        $filter = function (array $row) use ($cols) {
            return array_filter(
                $row,
                fn ($v, $k) => in_array($k, $cols, true),
                ARRAY_FILTER_USE_BOTH
            );
        };

        // Helper: upsert tolérant
        $save = function (array $payload) use ($cols) {
            // Recherche par slug si dispo, sinon par "titre" (name/title/label)
            $found = null;
            if (in_array('slug', $cols, true) && !empty($payload['slug'])) {
                $found = Service::query()->where('slug', $payload['slug'])->first();
            }
            if (!$found) {
                $titleCol = collect(['name','title','label'])
                    ->first(fn($c) => in_array($c, $cols, true) && !empty($payload[$c] ?? null));
                if ($titleCol) {
                    $found = Service::query()->where($titleCol, $payload[$titleCol])->first();
                }
            }

            if ($found) {
                foreach ($payload as $k => $v) {
                    $found->setAttribute($k, $v);
                }
                $found->save();
            } else {
                $s = new Service();
                foreach ($payload as $k => $v) {
                    $s->setAttribute($k, $v);
                }
                $s->save();
            }
        };

        // --- Données (les 4 services) ---
        $rows = [
            // 1) Installation
            [
                'name'            => 'Installation',
                'slug'            => 'installation',
                'position'        => 1,
                'is_active'       => true,
                'excerpt'         => "Confiez l’installation de votre réseau électrique à un électricien expérimenté intervenant sur Bordeaux et sa métropole (Mérignac, Pessac, Talence, Bègles…).",
                'content_heading' => 'Des installations sûres et durables',
                'content_md'      => trim("
Nous posons des réseaux **conformes à la norme NF C 15-100**, en neuf comme en rénovation.  
Chaque projet est dimensionné selon vos usages pour garantir **sécurité**, **confort** et **performance**.

Intervention partout sur la CUB : Bordeaux centre, Caudéran, Mérignac, Pessac, Talence, Bègles, Eysines, Gradignan, etc.

- Tableaux, disjoncteurs et protections différentielles.  
- Circuits d’éclairage, prises, VMC et lignes dédiées.  
- Pré-câblage multimédia et solutions connectées.
                "),
                'bottom_note'     => "Nous installons vos systèmes électriques selon les normes en vigueur sur Bordeaux Métropole.",
                // 'image_url'     => 'https://…', // (optionnel) ajoute si tu veux forcer une URL
            ],

            // 2) Mise aux normes
            [
                'name'            => 'Mise aux normes',
                'slug'            => 'mise-aux-normes',
                'position'        => 2,
                'is_active'       => true,
                'excerpt'         => "Un réseau ancien peut être dangereux. Nous remettons vos installations en conformité sur Bordeaux et toute la métropole, rapidement et sereinement.",
                'content_heading' => 'Sécurité et conformité NF C 15-100',
                'content_md'      => trim("
Nous réalisons un **diagnostic complet** (tableau, protections, câbles, appareillages) puis corrigeons les non-conformités pour réduire les risques d’incendie et d’électrocution, que vous soyez à Mérignac, Pessac, Talence, Bègles ou ailleurs dans la CUB.

- Remplacement de tableaux et interrupteurs différentiels.  
- Mise à la terre, sections de conducteurs, repérage des circuits.  
- Ajout de protections et de prises sécurisées.
                "),
                'bottom_note'     => "Nous remettons vos installations aux normes pour un confort et une sécurité totale sur Bordeaux Métropole.",
            ],

            // 3) Rénovation
            [
                'name'            => 'Rénovation',
                'slug'            => 'renovation',
                'position'        => 3,
                'is_active'       => true,
                'excerpt'         => "Modernisez vos installations pour gagner en sécurité, en confort et en performance énergétique — à Bordeaux et dans toute la CUB.",
                'content_heading' => 'Un réseau repensé pour votre quotidien',
                'content_md'      => trim("
Nous restructurons vos circuits, remplaçons les appareillages et optimisons l’éclairage pour une utilisation **pratique** et **économe**, que ce soit en appartement bordelais ou en maison sur la métropole.

- Modernisation de tableaux et lignes dédiées (four, plaques, etc.).  
- Ajout de prises, RJ45 et points lumineux selon vos usages.  
- Éclairages LED et commandes intelligentes.
                "),
                'bottom_note'     => "Nous rénovons vos installations pour plus de confort et de fiabilité sur Bordeaux Métropole.",
            ],

            // 4) Dépannage
            [
                'name'            => 'Dépannage',
                'slug'            => 'depannage',
                'position'        => 4,
                'is_active'       => true,
                'excerpt'         => "Panne de courant, tableau qui saute, prise défectueuse ? Intervention rapide sur Bordeaux, Mérignac, Pessac, Talence, Bègles et alentours.",
                'content_heading' => 'Intervention rapide et sécurisée',
                'content_md'      => trim("
Nous diagnostiquons l’origine de la panne et remettons votre installation en service en respectant les **normes de sécurité** : remplacement de disjoncteurs, recherche de défauts d’isolement, réparation de câbles, etc.

- Diagnostic précis du tableau et des circuits.  
- Réparation / Remplacement des éléments défectueux.  
- Conseils pour éviter les pannes à l’avenir.
                "),
                'bottom_note'     => "Nous assurons un dépannage rapide et efficace sur Bordeaux Métropole.",
            ],
        ];

        // Appliquer defaults simples si colonnes présentes
        foreach ($rows as $i => $row) {
            $payload = $filter($row);

            if (in_array('slug', $cols, true) && empty($payload['slug'] ?? null)) {
                $title = $payload['name'] ?? $payload['title'] ?? $payload['label'] ?? null;
                if ($title) $payload['slug'] = Str::slug($title);
            }
            if (in_array('position', $cols, true) && !isset($payload['position'])) {
                $payload['position'] = $i + 1;
            }
            if (in_array('is_active', $cols, true) && !isset($payload['is_active'])) {
                $payload['is_active'] = true;
            }
            if (in_array('duration_minutes', $cols, true) && !isset($payload['duration_minutes'])) {
                $payload['duration_minutes'] = 0;
            }
            if (in_array('base_price', $cols, true) && !isset($payload['base_price'])) {
                $payload['base_price'] = 0;
            }
            if (in_array('excerpt', $cols, true) && !isset($payload['excerpt'])) {
                $payload['excerpt'] = '';
            }
            if (in_array('description', $cols, true) && !isset($payload['description'])) {
                $payload['description'] = '';
            }

            $save($payload);
        }
    }
}
