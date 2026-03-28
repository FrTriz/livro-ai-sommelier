export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  tags_emocionais: string[];
  resumos: {
    quick: string;
    medium: string;
    deep: string;
  };
  deep_questions: string[];
}

export const booksDB: Book[] = [
  {
    id: '1',
    title: 'Sapiens: Uma Breve História da Humanidade',
    author: 'Yuval Noah Harari',
    isbn: '9788550804006',
    tags_emocionais: ['perspectiva', 'curiosidade', 'reflexão'],
    resumos: {
      quick: 'Um panorama revolucionário sobre como o Homo Sapiens dominou o planeta através da capacidade de criar ficções cognitivas.',
      medium: 'Harari divide nossa história em três grandes revoluções: Cognitiva, Agrícola e Científica. Ele argumenta que nossa principal vantagem evolutiva foi a habilidade de cooperar flexivelmente em grandes números através de crenças compartilhadas, como o dinheiro e a religião.',
      deep: 'A obra expõe o custo da Revolução Agrícola para a felicidade humana, tratando-a como "a maior fraude da história". Sapiens instiga a percepção de que todas as estruturas de nossa sociedade são apenas construtos intersubjetivos, nos confrontando com a falta de validade intrínseca do nosso antropocentrismo.'
    },
    deep_questions: [
      'Como a percepção de que leis, nações e dinheiro são apenas "ficções partilhadas" altera suas próprias ambições e estresses diários?',
      'Harari argumenta que a vida do agricultor era muito pior que a do caçador-coletor. Que sacrifícios modernos você faz pela suposta "segurança agrícola"?',
      'No epílogo, somos advertidos de estarmos nos tornando deuses irresponsáveis. Qual aspecto da evolução científica mais o assusta nesse sentido?'
    ]
  },
  {
    id: '2',
    title: 'O Alquimista',
    author: 'Paulo Coelho',
    isbn: '9780062315007',
    tags_emocionais: ['esperança', 'jornada', 'motivação', 'calma'],
    resumos: {
      quick: 'A jornada mágica do pastor Santiago para encontrar um tesouro e descobrir sua "Lenda Pessoal".',
      medium: 'Santiago deixa o conforto familiar buscando as Pirâmides. No trajeto, descobre como ouvir seu coração e entender a "Linguagem do Mundo". Encontra um Alquimista que o ajuda a entender que o tesouro sempre esteve de onde partira, mas a viagem era imprescindível.',
      deep: 'A jornada central defende que "quando você quer alguma coisa, todo o Universo conspira para que você realize o seu desejo". É uma narrativa profundamente estóica e panteísta sobre abandonar o medo das falhas em prol da própria intuição e conexão com o divino.'
    },
    deep_questions: [
      'Qual é a sua verdadeira "Lenda Pessoal", e quais medos do deserto estão te impedindo de persegui-la?',
      'O Rei de Salém fala sobre o "Princípio Favorável". Você já sentiu a sorte de principiante? Como lida com as provações rigorosas que seguem?',
      'Santiago descobre que o tesouro estava em casa. Que valor a jornada teve, afinal, se não a própria transformação existencial?'
    ]
  },
  {
    id: '3',
    title: 'Duna',
    author: 'Frank Herbert',
    isbn: '9780441172719',
    tags_emocionais: ['foco', 'poder', 'sobrevivência', 'tensão'],
    resumos: {
      quick: 'Um épico de intriga política medieval interplanetária no deserto brutal de Arrakis.',
      medium: 'Paul Atreides é levado ao hostil planeta Arrakis, a única fonte do valioso "Melange" (especiaria). A traição destrói sua casa, empurrando-o para o exílio com os Fremen, nativos adaptados ao rigor ardente e mortal do deserto.',
      deep: 'Muito além do messianismo da fantasia, Duna aborda controle ecológico rigoroso, religião como instrumento de engenharia social (Missionaria Protectiva) e subversão do modelo do "herói". Paul sabe da inescapável Jihad associada ao seu nome, o que envenena suas vitórias.'
    },
    deep_questions: [
      'A Ladainha contra o Medo ensina: "O medo é o assassino da mente". Qual situação recente você superou focando apenas no instante e anulando o pavor?',
      'Duna discute ecologia à escala existencial. Quão enraizados estamos nos recursos que consumimos a ponto de modelarem nossas políticas e culturas?',
      'O messianismo de Paul cobra um custo galáctico terrível. Até que ponto o modelo do "líder absoluto" é seguro diante das imprevisibilidades humanas?'
    ]
  },
  {
    id: '4',
    title: 'Meditações',
    author: 'Marco Aurélio',
    isbn: '9780812968255',
    tags_emocionais: ['calma', 'resiliência', 'foco', 'aceitação'],
    resumos: {
      quick: 'Diário íntimo do imperador romano instruindo a si mesmo a suportar decepções com estoicismo e nobreza.',
      medium: 'Sem intenção de publicação, Marco Aurélio escreveu exortações pessoais sob alta pressão das guerras. Foco em rejeitar a vaidade e os impulsos emocionais diante do absurdo alheio. A premissa de que temos poder extremo sobre nossas reações a fatos, mas não sobre eles.',
      deep: 'A perspectiva estóica aqui apela para o determinismo cosmológico tolerante ("Amor Fati"). Nossas dores psicológicas emergem apenas do próprio julgamento. Reforça-se continuamente a impermanência do império e da glória temporal de forma surpreendentemente melancólica e sublime.'
    },
    deep_questions: [
      '"Você tem poder sobre a sua mente, não sobre os eventos fora dela." Que frustração do seu dia perderia peso se visualizada por essa lente?',
      'Marco diz que os homens acordam para serem insolentes, mas ele deve tolerá-los como partes de um mesmo corpo (Logos). Como agir com empatia para quem deliberadamente o ofende?',
      'A morte e o esquecimento são temas obsessivos nas Meditações. De que forma internalizar o fim aproxima as suas ações cotidianas ao seu verdadeiro propósito?'
    ]
  },
  {
    id: '5',
    title: 'Hibisco Roxo',
    author: 'Chimamanda Ngozi Adichie',
    isbn: '9781616202415',
    tags_emocionais: ['liberdade', 'coragem', 'opressão', 'família'],
    resumos: {
      quick: 'O doloroso amadurecimento de uma jovem nigeriana sob o regime opressor de seu pai fanático religioso e politicamente íntegro.',
      medium: 'Kambili vê seu pai ser reverenciado na comunidade ao mesmo tempo que exerce terror psicológico na família. Ao visitar usa tia Ifeoma — acadêmica e desafiadora — Kambili experimenta risadas, discussão aberta (e o amor) que colidem furiosamente com as expectativas submissas.',
      deep: 'Há um retrato sublime das complexidades do fanatismo e do colonialismo em espelho com a política nacional fraturada por Golpes Militares. Eugene (o pai) rejeita suas origens (Papa-Nnukwu) para purgar sua alma na assimilação de um catolicismo punitivo, que culmina ironicamente em paralisia emocional.'
    },
    deep_questions: [
      'O pai de Kambili é violento em casa, mas herói na comunidade. Como gerir pessoas com personas fraturadas que exigem perfeição moral a qualquer custo?',
      'As risadas na casa de tia Ifeoma são assustadoras para Kambili inicialmente. O que em ser independente soa estranho até experimentarmos sua textura de forma real?',
      'O Hibisco Roxo das flores cresceu em meio a hostilidade. Como ambientes desafiadores catalisam o rompimento e forçam uma beleza dolorosa — e às vezes insustentável?'
    ]
  },
  {
    id: '6',
    title: 'O Mito de Sísifo',
    author: 'Albert Camus',
    isbn: '9780679733737',
    tags_emocionais: ['aceitação', 'rebeldia', 'foco'],
    resumos: {
      quick: 'Uma dissertação sobre a vida carecer de sentido divino e a opção pela rebelião, sem refugiar-se nas correntes da esperança passiva.',
      medium: 'Pela metáfora de Sísifo (condenado a rolar pela eternidade uma pedra na montanha por nada), Camus questiona o suicídio. Ele conclui que abraçar a lucidez do "absurdo", revoltar-se contra ele, e viver passionalmente é a resposta.',
      deep: '"A revolta dá os seus contornos ao absurdo." Não devemos fugir da futilidade através da crença nem nos aniquilarmos; mas aceitando a exaustão da pedra rolada diária como vitória do esforço individual para extrair o máximo das fagulhas biológicas sem esperança exterior.'
    },
    deep_questions: [
      'Na busca diária por "sentido", qual fatia do pânico que experimentamos viria apenas do fracasso dessa ilusão irrealizável?',
      'Se todas as carreiras ou metas no fim resultam na mesma vala mortal, qual a verdadeira essência da ação que escolhemos desempenhar e de seu esforço?',
      '"É preciso imaginar Sísifo feliz". Como você consegue achar um estado de triunfo, rebeldia, ou regozijo nos rituais cansativos repetitivos do seu dia a dia?'
    ]
  },
  {
    id: '7',
    title: 'A Metamorfose',
    author: 'Franz Kafka',
    isbn: '9780553213690',
    tags_emocionais: ['tristeza', 'isolamento', 'opressão', 'melancolia'],
    resumos: {
      quick: 'Gregor Samsa acorda misteriosamente convertido num inseto repugnante e sua utilidade — a única base de seu valor — entra em colapso com sua família dependente.',
      medium: 'Conforme Gregor compreende sua fisionomia abominável, seu chefe o caça no recinto. Ao ficar recluso no quarto, testemunhamos a espiral de desprezo em seus entes — antes pacíficos sob o sustento compulsivo de Gregor — em direção ao distanciamento perverso contra o empecilho repugnante em que ele consistia.',
      deep: 'A tragédia biopolítica das sociedades burocratizadas; quando todo vínculo humano converte sujeitos aos proventos de uma ferramenta — perder o valor utilitário converte o parente à própria condição de parasita horripilante, justificado pelo asco impudente das dinâmicas normais.'
    },
    deep_questions: [
      'Pela métrica de sua produtividade de mercado recente, até que margem você sentiu suas amizades e parentescos desvanecerem com sua utilidade?',
      'O pai acerta uma maçã venenosa no casco de Gregor que sela sua desolação. Culpamos os opressores estatais e corporativos, mas quantas vezes feridas irreversíveis residem no lar primário?',
      'A alegria e alívio de "limpeza" com o sacrifício mortal da criatura é indigerível. É possível haver amor quando não há funcionalidade, status e as necessidades excedem o suporte?'
    ]
  },
  {
    id: '8',
    title: 'O Poder do Hábito',
    author: 'Charles Duhigg',
    isbn: '9780812981605',
    tags_emocionais: ['motivação', 'foco', 'superação', 'produtividade'],
    resumos: {
      quick: 'O mecanismo neurológico que cria loops infinitos de ações e como nós arquitetamos rotinas e recompensas para moldar padrões eficientes sem o custo da força-de-vontade.',
      medium: 'Por meio do conceito "Gatilho-Rotina-Recompensa", a obra analisa desde o sucesso no Super Bowl e táticas das megacorporações ao resgate do alcoolismo, estabelecendo táticas pragmáticas de reestruturação isolada baseada as "Rotinas-Chave".',
      deep: 'Por trás dos hacks motivacionais, uma tese basilar que somos, literalidade física, feixes em looping sem espaço racional contínuo. Alterar comportamentos destrutivos é doloroso sem a premissa de um isolamento neutro ("Se me ocorrer fúria, contarei sete minutos para depois extravasar").'
    },
    deep_questions: [
      'Você é capaz de isolar, no pior de seus vícios de distração atuais, qual gatilho furtivo lhe instiga, e a sensação subjacente buscada nessa recompensa?',
      'Se fôssemos analisar seus impulsos rotineiros dos últimos três meses, que pequeno padrão tem contaminado suas melhores intuições mentais de progresso?',
      'A reprogramação requer persistência e "crença" para suportar abalos em picos estressantes. Qual seu nível de cinismo com métodos para tentar melhoria pessoal?'
    ]
  },
  {
    id: '9',
    title: 'Siddhartha',
    author: 'Hermann Hesse',
    isbn: '9783458317024',
    tags_emocionais: ['calma', 'clareza', 'reflexão', 'superação'],
    resumos: {
      quick: 'A rebeldia de um menino indiano que opta por experienciar dogmas opostos (abstinência devota frente ao sensualismo comercial) na caça incansável ao autoconhecimento final de Buda, em vez das regras repassadas por teóricos.',
      medium: 'Na mocidade recusa seguir Buda o "Iluminado Gáutama", confiante na tese cética da instransferibilidade. Convive com uma prostituta rica e magnatas apostadores decaindo nas compulsões burguesas até a náusea, por fim tornando-se aprendiz de um passivo balseiro ouvinte do Rio.',
      deep: 'Destaca que intelectos brilhantes sucumbem à tentação do "orgulho asceta ou filosófico", fechando portas. No fluxo hídrico indissolúvel das polaridades o riso e choro estão juntos com a corrupção e os profetas. Nirvana e o Samsara inexoravelmente andam abraçados na cadência eterna da humanidade ordinária.'
    },
    deep_questions: [
      'Você rejeitara instruções claras e optara pelas ruas, sofrendo reveses na mesma ilusão dos vícios dos quais pretendia ficar imune? Isso compõe seu grau de lucidez presente?',
      'Para alcançar a serenidade total, o ferrenho intelectual Siddhartha foi obrigado a ser varrido pelo "amor pueril e ciumento imposto pelos humanos comuns". Existe virtude orgulhosa demais onde as maiores lições virão apenas de onde subestimamos a "futilidade"?',
      'Quando o som do rio se aglutina em um gigantesco grito universal da unificação, onde enxerga harmonia para o choque diário da sua frustração?'
    ]
  },
  {
    id: '10',
    title: 'A Coragem de Ser Imperfeito',
    author: 'Brené Brown',
    isbn: '9781592408412',
    tags_emocionais: ['coragem', 'acolhimento', 'superação', 'ansiedade'],
    resumos: {
      quick: 'Pesquisadora destrincha os estigmas da vergonha, apresentando provas científicas de que se privar por medo das falhas drena sua criatividade, paixão e intimidade cruciais para relações íntegras.',
      medium: 'Os discursos contemporâneos propalam "bastamos uns os outros" mas impõem o terror ao vexame ou às críticas da mediocridade do erro. Ocupamos uma cultura da escassez; aceitar as rachaduras que temos quebra paradigmas egocêntricos do protecionismo na armadura narcísica que fere antes de acolher.',
      deep: 'Identifica que narcisismo na realidade nada significa sobre glória grandiosa, sim num colapso absoluto, letal e insustentável calcado num temor terrível de ser considerado vulgar. Vulnerabilidade propícia engajamento da inovação através do terreno imprevisível, incerto de resultados e escrutínio dos opositores.'
    },
    deep_questions: [
      'Frente a avaliações profissionais difíceis, em quantos momentos acionou a hiperdefesa por pânico e acabou rejeitando ou sabotando o conselho no orgulho?',
      'Em qual relação mais substancial de sua vida a blindagem do ego tem impedido comunicações em abismo aberto que seriam necessárias para purgas construtivas?',
      'Quantas vezes o medo sutil mas excruciante do "o que pensarão disso" amputou suas execuções nos primórdios?'
    ]
  },
  {
    id: '11',
    title: 'Admirável Mundo Novo',
    author: 'Aldous Huxley',
    isbn: '9780060850524',
    tags_emocionais: ['reflexão', 'perspectiva', 'foco', 'distopia'],
    resumos: {
      quick: 'Distopia sobre uma sociedade controlada através da estabilidade, felicidade química compulsória (Soma), lavagem cerebral noturna e manipulação genética no sistema de castas globalizadas.',
      medium: 'Substituindo a ditadura bélica por hedonismo sistemático, a humanidade abdicou de paixão orgânica, filosofia e laços pela comodidade garantida e sexo inconsequente. Bernard, um membro com problemas físicos alienado aos demais, se apropria de peculiar poder resgatando das selvagerias os desoladores exilados inadaptados na reserva "Natural" das velhas chagas humanas (doença e envelhecimento).',
      deep: 'Com chocante prescrição preditiva frente ao embate Orwelliano (dor e opressão repressiva): aqui atesta-se a escravização sádica pelo prazer, pela hiperlotação das estimulações curtas e perda das atenções prolongadas para evitar pensamentos agudos ou subversivos no sacrifício sublime de ser autêntico.'
    },
    deep_questions: [
      'Em momento de fadiga profunda você fugiu inteiramente da origem da angústia enturmando a mente no escopo fútil das redes e algoritmos alienadores e efêmeros de conforto imediato (seu "soma" particular)?',
      'Até que medida sua indignação com as métricas vazias contemporâneas resiste na prática ante aos confortos sociais de rebanho que estas concedem ao adequar-se à caixa rasa formatada e exigida por eles?',
      'Entre uma dor contundente que desperta ação, e um tédio amortecido em contentamento irrelevante que estagna e suprime as inovações... de qual você sente um real terror e nojo maiores e de qual já participou?'
    ]
  },
  {
    id: '12',
    title: 'Rápido e Devagar',
    author: 'Daniel Kahneman',
    isbn: '9780374533557',
    tags_emocionais: ['foco', 'clareza', 'curiosidade', 'produtividade'],
    resumos: {
      quick: 'Dissecção das engrenagens lógicas da mente subdividindo-se em: Sistema 1 (emoções, julgamentos precoces intuitivos e tendenciosos sem atrito) VS Sistema 2 (cálculos demorados exigindo gasto bruto mental).',
      medium: 'Demonstra a chocante inaptidão estruturada do cérebro nos ditames estatísticos do sistema reflexo preguiçoso para formar convicções de viés enviesado e heurístico sob incertezas imprecisas que causam avaliações de cenários ilusórias.',
      deep: 'Revela empiricamente na psicologia quantitativa que nossa racionalidade deliberada se apresenta como "atriz esgotada e cansada assumindo um show fictício por cima de instintos caóticos". Entendimentos lógicos e exaustivos sobre as ilusões de mercado financeiro em apostar fortunas sem o autoconhecimento estatístico elementar.'
    },
    deep_questions: [
      'Por quantas evidências contundentes de conselhos bem dados você já ignorou, confiando na presunçosa intuição inexperiente do Sistema 1 quando julgou prever as nuances do destino e acabou traindo-se por emoção precipitada?',
      'Recorda sobre as "ilusões de ancoragem", onde o seu primeiro dado recebido pauta irracionalmente suas transações e avaliações? Em negociações presentes quanto isto têm roubado as rédeas?',
      'Por que demandamos tanto "ver com os próprios olhos" em decisões se os dados absolutos revelam ineficácia ou impossibilidades da tarefa?'
    ]
  },
  {
    id: '13',
    title: 'A Cor Púrpura',
    author: 'Alice Walker',
    isbn: '9780151191546',
    tags_emocionais: ['superação', 'tristeza', 'coragem', 'liberdade'],
    resumos: {
      quick: 'Impactante epistolário acompanhando Celie, uma afroamericana pobre e agredida brutalmente desde o nascimento com uma vida inenarrável com a misoginia familiar.',
      medium: 'Destituída por uma sequência de domínios grotescos pelo "Senhor", deparamos com seu submetimento acanhado diante do assalto psicológico até despertar gradual aos estímulos amorosos excêntricos da carismática companheira independente do algoz marido ("Shug Avery").',
      deep: 'Denúncia brutal no feminismo seccional contra o "racismo verticalizado". Onde perdoar não é conformar-se com covardias atrozes ou absolvição passiva do sádico mas arrancar o véu interior de não-merecedora internalizado na própria opressão e recuperar agressivamente a sua espiritualidade não-punitiva de conexão a cor-púrpura da glória natural independente da brutalidade masculina em que era asfixiada no dia-a-dia rural.'
    },
    deep_questions: [
      'Até onde as crenças que te diziam "você não é o bastante", por um abusador, envenenou as visões do seu merecimento aos progressos na jornada solitária de independência?',
      'O encontro solidário forjou uma armadura emocional insuspeita salvadora de Celie perante a tortura mental e a opressão totalitária, você já salvou os ombros dos escombros emocionais e ajudou suportar fardos esmagadores de seus iguais fraturados com uma conexão honesta?',
      'Reflete o seu panteísmo, ou ausência de dogmas para olhar e desfrurtar ativamente as peculiaridades e tons divinos ignorados, as sujas belezas de mundo e "a cor-púrpura nos prados?"'
    ]
  },
  {
    id: '14',
    title: 'Fahrenheit 451',
    author: 'Ray Bradbury',
    isbn: '9781451673319',
    tags_emocionais: ['distopia', 'perspectiva', 'coragem', 'reflexão'],
    resumos: {
      quick: 'Distopia clássica no futuro apocalíptico e frívolo sobre Guy Montag: o bombeiro que asfixiava a sabedoria incinerando em fogueiras espetaculosas inteiras bibliotecas secretas apreendidas para evitar insatisfações por excesso de conhecimento ou idéias que se contrapõem para estigmatização popular.',
      medium: 'Instigado pelas peculiaridades curiosas singelas juvenis (Clarisse McClellan) ao oposto da esposa lobotomizada perante ao "Mundo Sala de Convivências" nas paredes cegas alienantes, tenta absorver com asfixia moral todo repertório censurado incandescente e confronta-se perante o niilista cínico erudito antagonista capitão para resgatar-se em oposição as massas complacentes alienadas com os visores informacionais imediatos.',
      deep: '"Nós não estamos precisando de mais livros. Estamos precisando das coisas que já habitaram os livros." Num mundo despojado das essências contraditórias no afã estroina a fim de proteger das "alegadas ofensa", amputaram a densidade civil e empobreceram nas respostas anestesiantes vazias instantâneas midiáticas para os conflitos psíquicos sem saída da exaustão generalizada.'
    },
    deep_questions: [
      'Como seu vício às correntes em rolagem rápidas nos smartphones mimetiza estupefacientemente as catatônicas massas em êxtases dos monitores fúteis visuais na parede e as pílulas para preencher os buracos do peito descritos nas telas de submissão do Montag?',
      'Na covardia perante a profundidade intelectual, que livro espinhoso ou desconforto reflexivo essencial exigiria da sua parte mergulhar numa catarse contrária dos contentamentos anestesiantes alienantes imediatos no seu ócio atual consumista e raso nas redes pra você absorver inteira lucidez?',
      'Que verdades subversivas você ignora ativamente num silêncio passivo em benefício e resguardo covarde na ilusão artificial do status quo ou da popularidade efêmera para acovardar as confrontações ríspidas requerentes da transformação de seu caráter central em vez de ser carbonizado mediocrizadamente de passividade?'
    ]
  },
  {
    id: '15',
    title: 'O Caçador de Pipas',
    author: 'Khaled Hosseini',
    isbn: '9781594631931',
    tags_emocionais: ['culpa', 'redenção', 'melancolia', 'esperança'],
    resumos: {
      quick: 'Impactante jornada dilacerante afegã da traição infantil do fidalgo amedrontado ao devoto escravo inseparável "Sempre para a ti, mil vezes se preciso for" que carrega suas conseqüências num resgate traumático violento do abismo para pacificar as máculas dos próprios erros.',
      medium: 'Na juventude afegã entre abismos aristocráticos e lealdades do garoto de coração absoluto fiel e passivo, corrompido nos conflitos do horror sectário por covardias pueris irremitentes no abandono perante violações traumáticas sexuais terríveis na ausência e distanciamento brutal do Amir covarde para conquistar favores paternais. Trazem no abismo dezenove anos adiante a única retificação violenta perante ao retorno e a destruição talibã que estilhaçaram seus alicerces morais da honra num combate pela criança de sua extinta metade fiel traída no tormento redentor.',
      deep: '"Há um jeito de ser bom de novo" — Sobre os escombros desumanos na guerra de horrores sectários dos regimes tiranos no sangue fraturado de um refúgio e fuga onde Amir enfrenta nas engrenagens monstruosas das punições talibãs não para reconquistar mas ser surrado pelas mesmas porções e sacrifícios violentos das brutalidades do karma. Para coligir a coragem brutal abdicada e estilhaçar-se nos espinhos imperdoáveis passados do asilo à busca desesperada pela humanidade num campo desolador perversamente destroçado.'
    },
    deep_questions: [
      'Como os fantasmas em não intercederem sob os covardes e egocêntricos distanciamentos passados em defesas das presas ou assédios presenciados corrompem suas confianças futuras sobre o heroísmo virtuoso idealizado imaginário onde sua própria omissão já cravou seu amargo julgamento culposo ocultado com arrependimentos velados irremediáveis?',
      'Nas assimetrias fraternas, quantos devotamentos totais sacrificaram no abismo ignorando retribuições honestas da submissão dos de baixos com superioridade impiedosas?',
      'Qual perseguição destrutivista por honras fúteis paternais e ambições rasas sacrificou em cegueira sua empatia nas chagas humanas, deixando as conseqüências cicatrizadas com a desolação em perdas eternas de almas e inocência nas relações humanas?'
    ]
  },
  {
    id: '16',
    title: 'Orgulho e Preconceito',
    author: 'Jane Austen',
    isbn: '9788544001824',
    tags_emocionais: ['romance', 'perspectiva', 'paciência', 'reflexão'],
    resumos: {
      quick: 'Um romance astuto sobre o choque frontal das primeiras impressões amorosas limitadas entre Elizabeth Bennet e Mr. Darcy na aristocracia inglesa.',
      medium: 'Sob pressões econômicas de arranjar casamentos de puro provento para a estabilidade das filhas Bennet, a sagaz Elizabeth rejeita as posturas snobes de Darcy, o rico misterioso, enquanto este se repugna com a falta de refinamento das irmãs dela. Suas visões se polarizam no orgulho e na ofensa pré-julgada do preconceito inicial.',
      deep: 'Tragicomédia brilhante das limitações do olhar. Ambas contrapartes precisam abdicar humilhantemente das fortalezas de suas vaidades morais ou de berço e reconhecer os próprios julgamentos viciados e precipitados numa curva desarmante. Para Austen, o amor real não nasce de impulsões passagens descontroladas vulgares mas ao confrontar dolorosamente a verdade e estimar ativamente os amadurecimentos.'
    },
    deep_questions: [
      'Recorda alguma oportunidade pessoal que você perdeu ao deixar o "preconceito" na primeira impressão formar uma negação rígida infundada?',
      'Seu atual engajamento amoroso exige mais da tolerância a dor de enxergar os defeitos dele/dela nos abismos da convivência, ou na ilusão do delírio da paixonite efêmera ideal intocável?',
      'Em que níveis as pressões "sociais e de sobrevivência" hoje governam seus próprios critérios íntimos mais do que você admitiria em público?'
    ]
  },
  {
    id: '17',
    title: 'O Senhor dos Anéis: A Sociedade do Anel',
    author: 'J.R.R. Tolkien',
    isbn: '9788595084742',
    tags_emocionais: ['fantasia', 'coragem', 'esperança', 'superação'],
    resumos: {
      quick: 'Uma odisseia épica na Terra-Média pela improvável responsabilidade cravada sobre o portador de um mal terrível num anel.',
      medium: 'A paz bucólica do Condado é corrompida quando o humilde hobbit Frodo herda "O Um Anel", catalisador das maldades eternas de Sauron. Formando uma guilda frágil das raças desconfiadas em desunião (A Sociedade), viajam aos horrores nas abismais desolações num teste imenso às tentações individualistas pelo mero contato da jóia.',
      deep: 'Não é um combate do poder contra o poder nas espadas flamejantes, é sobre sacrifício ético. A fragilidade absoluta assume o fardo pesado perante reis soberbos armados. Retrato teológico denso que prega sobre como perigos cósmicos monstruosos são suprimidos ou sustentados exclusivamente a partir de intenções íntimas corrompidas, sem ignorar as crueldades na passagem.'
    },
    deep_questions: [
      'Gandalf não ousa carregar a fonte de tal "poder" corrompedor absoluto apesar do intelecto bom. Há ambições ou status nocivos atuais a cuja capacidade destrutiva sua índole perante eles é muito tentada?',
      'Diante da vasta escuridão intimidadora, Frodo sente saudades ingênuas de uma futilidade campestre inalcançável. Num momento esmagador que você cruzou, onde achou força solidária pra não recuar para o "Condado da mediocridade"?',
      'Até onde a solidão imposta ao carregar um fardo indizível no seu peito poderia ser aliviada se você soubesse delegar parte da travessia a sua própria provável "Sociedade do Anel"?'
    ]
  },
  {
    id: '18',
    title: 'Mensagem',
    author: 'Fernando Pessoa',
    isbn: '9789720046645',
    tags_emocionais: ['poesia', 'esperança', 'melancolia', 'coragem'],
    resumos: {
      quick: 'O único livro poético em português publicado em vida por Fernando Pessoa contendo um tom profético místico nos lamentos pela glória desbotada de Portugal.',
      medium: 'Com estruturada divisão heráldica e messiânica de resenhatar heróis sebastianistas de além-mar da Era dos Descobrimentos, constrói os mitos de um país em estado decante com a profecia de um novo Quinto Império. Diferente de frotas e naus de outrora, o misticismo Pessoano crê num império não com fronteiras, mas de transcendência e universalismo poético.',
      deep: 'A melancolia nacional profunda sobrevive nesta lírica não nas nostalgias conformadas. "Tudo vale a pena se a alma não é pequena", versa no mar sem fim onde as tragédias são etapas de uma glória superior transcendente que suplanta o sofrer vulgar, no que ele chama do sacrifício criador que as tormentas e abismos demandam.'
    },
    deep_questions: [
      'Na célebre frase "Deus quer, o homem sonha, a obra nasce" da escuridão do abismo. Em quantas ambições gigantescas suas, este "sonho" estancou medrosamente sem transpassar ao nascer das ações materiais?',
      'Diante de suas tragédias como em "Tudo vale a pena se a alma não é pequena", em qual aspecto o medo do sacrifício vulgar têm atrofiado os ímpetos de sua alma nas incertezas dos mares?',
      'Qual seria hoje seu ideal mítico grandioso escondido de "Quinto Império" além das fronteiras estagnadas da vida prática, pronto para transcender o mero desinteresse letárgico atual?'
    ]
  }
];
