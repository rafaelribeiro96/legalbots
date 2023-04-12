

# Orientações para instalação e ativação do backend
1. Com o docker instalado, rode o seguinte comando: 

obs: recomendo utilizar o Workbench para visualizar o banco de dados. Acesse com usuário root, senha 123456
```
docker run -d -p 3306:3306 --name=mysql-server --env="MYSQL_ROOT_PASSWORD=123456" mysql
```

  2. Abra o terminal ou prompt de comando e navegue até a pasta do projeto onde você deseja criar o ambiente virtual. Execute o comando para criar um novo ambiente virtual, substituindo nome_do_ambiente pelo nome que deseja dar ao ambiente:
```
python -m venv .venv
```
  3. Ative o ambiente virtual executando o comando adequado para o seu sistema operacional:
No Windows: 
```
.venv\Scripts\activate.bat
```
No Unix ou Linux: 
```  
source .venv/bin/activate
```

4. Agora que o ambiente virtual está ativado, você pode instalar os pacotes listados no arquivo requirements.txt. Certifique-se de que o arquivo requirements.txt esteja na pasta do projeto.
Execute o comando abaixo:

```
pip install -r requirements.txt
```

