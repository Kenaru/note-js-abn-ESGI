import { useEffect } from "react";

// Hook personnalisé pour exécuter un effet de manière décalée
export const useDebouncedEffect = (effect, deps, delay) => {
  useEffect(() => {
    // Déclencher un effet après un délai donné en utilisant setTimeout
    const handler = setTimeout(effect, delay);

    // Nettoyer le timeout lorsque le composant est démonté ou lorsque les dépendances changent
    return () => clearTimeout(handler);
  }, [effect, delay]); // Surveiller les changements de l'effet et du délai
};
