import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {
  /** Controlador do input de nova tecnologia */
  const [tech, setTech] = useState(['ReactJS', 'React Native']);
  /** Lista de tecnologias */
  const [newTech, setNewTech] = useState('');

  /** Hook para carregar a lista de tecnologias salvas no localStore quando o
   * componente for montado */
  useEffect(() => {
    const localTech = localStorage.getItem('tech');

    if (localTech) {
      setTech(JSON.parse(localTech));
    }
  }, []);

  /** Hook para salvar no localStorage sempre que uma tecnologia for
   * cadastrada */
  useEffect(() => {
    localStorage.setItem('tech', JSON.stringify(tech));
  }, [tech]);

  /** useMemo para salvar em memória o retorno da quantidade de tecnologias até
   * que o mesmo seja alterado, economizando processamento */
  const techSize = useMemo(() => tech.length, [tech]);

  /** useCallback para previnir que o navegador redeclare sempre a função dentro
   * do componente sempre que ele for atualizado, economizando processamento
   */
  const handleAdd = useCallback(() => {
    setTech([...tech, newTech]);
  }, [tech, newTech]);

  return (
    <>
      <ul>
        {tech.map(t => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <strong>Você tem {techSize} tecnologias.</strong>
      <br />
      <input type="text" onChange={e => setNewTech(e.target.value)} />
      <button type="button" onClick={handleAdd}>
        Adicionar
      </button>
    </>
  );
}

export default App;
