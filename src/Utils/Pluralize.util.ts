export class PluralizeUtil {
  public static pluralize(word) {
    // Verifique se a palavra termina em "s", "z" ou "r" e adicione "es" ao final
    if (word.endsWith('s') || word.endsWith('z') || word.endsWith('r')) {
      return word + 'es';
    }
    // Verifique se a palavra termina em "ão" e substitua por "ões"
    else if (word.endsWith('ão')) {
      return word.slice(0, -2) + 'ões';
    }
    // Verifique se a palavra termina em "l" e substitua por "is"
    else if (word.endsWith('l')) {
      return word.slice(0, -1) + 'is';
    }
    // Verifique se a palavra termina em "m" e substitua por "ns"
    else if (word.endsWith('m')) {
      return word.slice(0, -1) + 'ns';
    }
    // Em todos os outros casos, simplesmente adicione "s" ao final da palavra
    else {
      return word + 's';
    }
  }

  public static singularize(word) {
    // Verifique se a palavra termina em "es"
    if (word.endsWith('es')) {
      // Verifique se a palavra termina em "ses" ou "zes", e mantenha a palavra no plural
      if (word.endsWith('ses') || word.endsWith('zes')) {
        return word;
      }
      // Verifique se a palavra termina em "ões" e substitua por "ão"
      else if (word.endsWith('ões')) {
        return word.slice(0, -3) + 'ão';
      }
      // Verifique se a palavra termina em "ais" e substitua por "al"
      else if (word.endsWith('ais')) {
        return word.slice(0, -1);
      }
      // Verifique se a palavra termina em "eis" e substitua por "el"
      else if (word.endsWith('eis')) {
        return word.slice(0, -1);
      }
      // Verifique se a palavra termina em "is" e substitua por "il"
      else if (word.endsWith('is')) {
        return word.slice(0, -1) + 'l';
      }
      // Verifique se a palavra termina em "ns" e substitua por "m"
      else if (word.endsWith('ns')) {
        return word.slice(0, -1) + 'm';
      }
      // Verifique se a palavra termina em "rs" e substitua por "r"
      else if (word.endsWith('rs')) {
        return word.slice(0, -1);
      }
      // Em todos os outros casos, remova o "s" do final da palavra
      else {
        return word.slice(0, -1);
      }
    }
    // Em todos os outros casos, retorne a palavra original
    else {
      return word;
    }
  }
}
