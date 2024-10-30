export function Rodape() {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '60px',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999, // Defina um valor alto para z-index
      }}
    >
      &#169; Copyright 2023. Todos os direitos reservados.
    </div>
  );
}
