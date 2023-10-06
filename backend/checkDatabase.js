const net = require('net');

function waitAndExecute(host, port, timeout, command) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const interval = 1000; // Interval in milliseconds for checking availability

    function check() {
      const socket = new net.Socket();

      socket.setTimeout(1000);
      socket.on('connect', () => {
        socket.destroy();
        const end = Date.now();
        const seconds = (end - start) / 1000;
        console.log(`Host ${host}:${port} is available after ${seconds} seconds`);
        resolve();
      });

      socket.on('error', (err) => {
        if (Date.now() - start < timeout * 1000) {
          setTimeout(check, interval);
        } else {
          console.error(`Timeout occurred after waiting for ${timeout} seconds`);
          reject(err);
        }
      });

      socket.connect(port, host);
    }

    check();
  }).then(() => {
    if (command) {
      console.log(`Executing command: ${command}`);
      // Aqui, você pode executar o comando especificado
      // Exemplo: require('child_process').execSync(command, { stdio: 'inherit' });
    }
  });
}

// Exemplo de uso
// const host = 'postgres://';
const host = 'db';
const port = 5432;
const timeout = 20;
const command = 'echo "Host is available"';
waitAndExecute(host, port, timeout, command)
  .catch((error) => {
    console.error('Error:', error);
  });
