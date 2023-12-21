import React, { useRef, useEffect, KeyboardEvent, forwardRef, ForwardedRef, useImperativeHandle } from 'react';

interface SeuComponenteProps {
  // Adicione outras propriedades necessárias para o seu componente
}

// Usando React.forwardRef para receber a ref
const SeuComponente = React.forwardRef(function (
  props: SeuComponenteProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    // Exemplo: verificar se a tecla Enter foi pressionada
    if (event.key === 'Enter') {
      console.log('Enter pressionado!');
      // Adicione aqui a lógica que você deseja executar quando a tecla Enter for pressionada
    }
  };

  // Usando a ref recebida
  useImperativeHandle(ref, () => ({
    // Expondo a funcionalidade do componente pai, se necessário
    focus: () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
  }));

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        onKeyDown={handleKeyDown} // Associando a função ao evento onKeyDown
      />
      {/* Outros elementos do seu componente */}
    </div>
  );
});

interface SeuComponentePaiProps {
  // Adicione outras propriedades necessárias para o seu componente pai
}

// Usando React.forwardRef para encaminhar a ref para o componente filho
const SeuComponentePai: React.FC<SeuComponentePaiProps> = () => {
  const outroInputRef = useRef<HTMLInputElement>(null);

  // Passando a ref para o componente filho usando React.forwardRef
  return (
    <div>
      <SeuComponente ref={outroInputRef} />
      {/* Outros elementos do seu componente pai */}
    </div>
  );
};

export default SeuComponentePai;
