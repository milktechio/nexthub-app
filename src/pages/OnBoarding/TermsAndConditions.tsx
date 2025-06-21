import React, {useEffect, useState} from 'react';
import {
  Flex,
  StatusBar,
  Text,
  HStack,
  VStack,
  Button,
  Checkbox,
  ScrollView,
} from 'native-base';
import HeaderNav from '../../components/Header';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {Alert} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {RegisterAsync, resetRegister} from '../../redux/slices/userSlice';

const TermsAndConditions = () => {
  const registerLoading = useAppSelector(state => state.user.registerLoading);
  const registerSuccess = useAppSelector(state => state.user.registerSuccess);
  const registerError = useAppSelector(state => state.user.registerError);
  const registerErrorMsg = useAppSelector(state => state.user.registerErrorMsg);

  const [check, setCheck] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const route = useRoute();
  const paramsData = route.params;

  const toggle = () => {
    if (check === false) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };

  function createAccountHandler() {
    if (check === false) {
      Alert.alert(
        'En necesario aceptar los términos y condiciones para continuar',
      );
      return;
    }

    const finalData = {
      ...paramsData,
      profession: 'free',
    };

    dispatch(RegisterAsync(finalData));
  }

  useEffect(() => {
    if (registerSuccess) {
      Alert.alert(
        'Usuario creado correctamente. ✅',
        'Por favor verifica tu cuenta con el correo que te hemos enviado.',
      );
      dispatch(resetRegister());

      //@ts-ignore
      navigation.navigate('login');
    }

    if (registerError) {
      console.log(registerErrorMsg);
      // let [key, value] = Object.entries(registerErrorMsg)[0];
      Alert.alert('Por favor, intente de nuevo.');
      dispatch(resetRegister());

      //@ts-ignore
      navigation.navigate('viajemosJuntos');
    }
  }, [registerSuccess, registerError]);

  return (
    <>
      <HeaderNav title="Terminos y Condiciones" />
      <StatusBar barStyle={'light-content'} />
      <Flex
        justifyContent={'center'}
        alignItems={'center'}
        bg={'brand.primary'}>
        <ScrollView h="95%" w="85%">
          <VStack py={12} space={9} w="100%">
            <Text color="brand.secondary" textAlign={'justify'}>
              **Términos y Condiciones de Uso de la Aplicación "Barrap"** Únete
              a la "Barrapp" y suma a tu comunidad y tu entorno. Antes de
              utilizar nuestra plataforma, te pedimos que leas detenidamente
              estos Términos y Condiciones de Uso. Al leer y aceptar expresa o
              tácitamente estos T&C, como usuario aceptas, reconoces y
              garantizas tener la capacidad legal y jurídica para afiliarte al
              club. Es importante mencionar, que adicionalmente al ingresar a la
              app, consideramos que estas de acuerdo con nuestro “Aviso de
              Privacidad” así como con las normas y regulaciones internas para
              los clubes comunitarios, dichos términos son accesibles en nuestro
              portal web. En Barrap queremos escucharte, que sumes y formes
              parte activa de nuestra comunidad, en esta etapa sólo podemos
              registrar usuarios personas físicas de conformidad a la
              normatividad mexicana, cualquiera que ingrese a la app se
              entenderá lo hace a nombre propio y actúa por consecuencia solo en
              su nombre y representación. **1. Registro de Usuarios Cualquier
              persona que desee utilizar los Servicios deberá aceptar los
              presentes Términos y Condiciones, para poder crear una cuenta (en
              adelante la «Cuenta») dentro de la aplicación. Al crear una cuenta
              cualquier persona registrada será considerada para efectos de este
              acuerdo como un “Usuario”, este usuario será requerido a
              proporcionar toda la información que sea necesaria para el
              desenvolvimiento de la aplicación. El Usuario deberá adjuntar los
              documentos que acrediten sus dichos, comprometiéndose a mantener
              la información exacta, completa y actualizada. Barrap se reserva
              el derecho de solicitar comprobantes adicionales y/o información
              nueva a efectos de corroborar la información manifestada por el
              Usuario, así como de suspender temporal o definitivamente a
              aquellos Usuarios cuyos datos no hayan podido ser confirmados o
              validados, sin previo aviso. Barrap se reserva el derecho de
              rechazar una solicitud de registro o de cancelar o suspender,
              temporal o definitivamente una Cuenta, sin previo aviso, en caso
              de detectar incongruencias o inconsistencias en la información
              proporcionada por un Usuario o en caso de detectar actividades
              sospechosas, sin que tal decisión genere para el Usuario derechos
              de indemnización o resarcimiento. **2. Vigencia. ** El presente
              acuerdo será de duración indeterminada. No obstante, el Usuario
              puede solicitar la terminación en cualquier momento, siempre y
              cuando no existan obligaciones pendientes que liquidar por parte
              del Usuario o disposiciones pendientes de resolución dentro de la
              regulación de los presentes T&C. Barrap podrá modificar en
              cualquier momento los presentes T&C, notificando al Usuario los
              cambios realizados publicando una versión actualizada de dichos
              T&C en el sitio web de la comunidad con expresión de la fecha de
              la última modificación. Todos los términos modificados entrarán en
              vigor a los 12 (doce) días de su publicación. Dentro de los 5
              (cinco) días siguientes a la publicación de las modificaciones
              introducidas, el Usuario deberá comunicar por email si no acepta
              las mismas; en ese caso quedará disuelto el vínculo contractual.
              Vencido este plazo, se considerará que el Usuario acepta los
              nuevos T&C y el contrato continuará vigente vinculando a ambas
              partes. **3. Uso Apropiado de la Aplicación** 1. La aplicación
              "Barrapp" se proporciona para facilitar la comunicación,
              coordinación y colaboración entre usuarios interesados en eventos
              y objetivos comunes. Te comprometes a utilizar la aplicación de
              manera responsable y ética siguiendo en todo momento las
              recomendaciones que de manera enunciativa mas no limitativa se te
              indican: Respeto y Tolerancia: Trata a todos los usuarios con
              respeto y consideración, incluso si tienes opiniones diferentes.
              Evita comentarios ofensivos, difamatorios o discriminatorios.
              Protección de la privacidad: Cuida tu información personal y la de
              otros. No compartas datos sensibles ni información privada en
              público. Utiliza las configuraciones de privacidad para controlar
              quién puede ver tus publicaciones. Veracidad y Autenticidad:
              Publica información veraz y evita difundir noticias falsas o
              rumores. Contribuye a mantener un ambiente de confianza y
              credibilidad. Comunicación Constructiva: Participa en
              conversaciones de manera constructiva. Ofrece críticas y opiniones
              de forma respetuosa y fundamentada, fomentando el diálogo en lugar
              de confrontaciones. Respalda tus Opiniones: Si compartes
              información o datos, asegúrate de respaldarlos con fuentes
              confiables. Esto ayuda a evitar la propagación de información
              errónea. Comparte con Moderación: No sobrecargues a tus seguidores
              con publicaciones excesivas. Encuentra un equilibrio y comparte
              contenido relevante y diverso. Seguridad Cibernética: Mantén tu
              cuenta segura utilizando contraseñas robustas y activando la
              autenticación de dos factores si es posible. Ten cuidado con
              enlaces sospechosos y no compartas tus credenciales. Derechos de
              Autor y Propiedad Intelectual: Respeta los derechos de autor y la
              propiedad intelectual. No publiques contenido sin el permiso
              adecuado y da crédito a los creadores cuando corresponda.
              Promoción Positiva: Utiliza la plataforma para promover causas y
              proyectos positivos. Comparte buenas noticias, inspira y
              contribuye al bienestar de la comunidad. Reporte de Contenido
              Inapropiado: Si encuentras contenido ofensivo, abusivo o que
              infrinja los términos de la plataforma, repórtalo en lugar de
              interactuar con él. Ayuda a mantener un entorno seguro y amigable.
              Recuerda que tus acciones en una red social pueden tener un
              impacto duradero. Siguiendo estas directrices, contribuirás a un
              ambiente en línea más saludable y respetuoso para todos los
              usuarios. IMPORTANTE: No deberás utilizar nunca la aplicación para
              fines ilegales, difamatorios, abusivos, acosadores, amenazantes,
              obscenos o de cualquier manera que infrinja los derechos de
              terceros. **4. Contenido Generado por el Usuario** 1. Al utilizar
              la aplicación, puedes generar contenido como publicaciones,
              comentarios, imágenes y otros materiales (en adelante,
              "Contenido"). Eres el único responsable de cualquier Contenido que
              publiques y garantizas que tienes los derechos necesarios para
              hacerlo. 2. Otorgas a "Barrapp" una licencia no exclusiva,
              mundial, libre de regalías y sublicenciable para usar, reproducir,
              modificar, adaptar, publicar y distribuir tu Contenido con el
              propósito de operar y mejorar la aplicación. Al adquirir la
              calidad de usuario, en todo momento se debe considerar como
              comprometido a garantizar que cualquier contribución que usted
              haga al universo de la aplicación, esté en concordancia con las
              normas internas y sobre todo con la legislación mexicana en
              materia de propiedad intelectual, asumiendo la total
              responsabilidad frente a barrap, comprometiéndose a pagar una
              indemnización economica por cualquier incumplimiento de esta
              garantía. En consecuencia, usted será considerado responsable por
              cualquier pérdida o daño que podamos sufrir como resultado de la
              infracción de esta garantía por su parte. Cabe destacar que
              cualquier contenido que suban o genere un usuario se considerará
              como información no confidencial y sin exclusividad en cuanto a su
              propiedad. Por lo tanto, no debe publicar ningún contenido en la
              app de Barrap que usted considere confidencial o de su propiedad
              exclusiva o de terceros. Al generar contenido a través de la app,
              usted confirma y declara que es propietario de dicho contenido o
              que ha obtenido todos los permisos y autorizaciones necesarios, o
              está autorizado por el propietario del contenido correspondiente,
              para cargarlo en la app. **5. Clubes Internos y Eventos** 1. La
              aplicación permite la formación de "clubes" internos donde los
              usuarios pueden coordinar eventos y apoyar causas diversas. Eres
              libre de unirte a estos clubes o crear tus propios clubes, siempre
              y cuando cumplas con los términos y condiciones aquí establecidos.
              2. Los organizadores de clubes son responsables de administrar sus
              clubes y eventos de manera coherente con estos Términos y
              Condiciones y cualquier política adicional proporcionada por
              "Barrapp". **6. Privacidad** 1. Todos quienes conformamos Barrap,
              queremos garantizarte que valoramos profundamente tu privacidad y
              estamos comprometidos a crear un entorno seguro y acogedor para
              todos los usuarios. La privacidad de nuestros usuarios es un eje
              fundamental de todo nuestro quehacer por lo que te comentamos los
              siguientes aspectos prioritarios para nosotros: Recopilación
              Responsable de Datos Personales: Entendemos la importancia de tus
              datos personales y sólo recopilamos la información necesaria para
              brindarte una experiencia óptima en nuestra plataforma. Esto puede
              incluir tu nombre, dirección de correo electrónico, y en algunos
              casos, información de perfil adicional que elijas proporcionar.
              Uso de Datos para Mejorar la Experiencia: Los datos recopilados se
              utilizan para personalizar tu experiencia en la plataforma y
              brindarte contenido relevante, como eventos, grupos y noticias.
              También utilizamos la información para analizar tendencias y
              patrones de uso, lo que nos ayuda a mejorar continuamente nuestros
              servicios y diseñar funciones que se adapten a tus necesidades.
              Comunidad Inclusiva y Activa: Nuestra meta es fomentar una
              comunidad en línea inclusiva y activa. Los datos recopilados se
              utilizan para crear perfiles de usuario que facilitan la
              interacción y la conexión con otros miembros de la comunidad que
              comparten intereses y objetivos similares. Al unirte a grupos y
              eventos, podrás colaborar y coordinarte con otros usuarios de
              manera efectiva. Protección y Seguridad de Datos: Nos tomamos muy
              en serio la seguridad de tus datos personales. Implementamos
              medidas técnicas y organizativas para proteger tus datos contra el
              acceso no autorizado, la pérdida y el uso indebido. Tus datos
              personales no serán compartidos con terceros sin tu consentimiento
              explícito, y sólo se utilizarán para los fines descritos en esta
              política. En Barrap, creemos en la transparencia y la confianza.
              Siempre estamos disponibles para responder tus preguntas sobre
              cómo gestionamos tus datos personales. Queremos que te sientas
              seguro(a) al formar parte de nuestra comunidad, sabiendo que
              estamos comprometidos a proteger tu privacidad mientras trabajamos
              juntos para construir una comunidad inclusiva y activa. **7.
              Modificaciones y Terminación** 1. Nos reservamos el derecho de
              modificar, suspender o descontinuar la aplicación en cualquier
              momento, sin previo aviso. 2. Podemos terminar tu acceso a la
              aplicación si determinamos que has violado estos Términos y
              Condiciones u otras políticas relacionadas. Estos son los Términos
              y Condiciones de Uso de la aplicación "Barrapp". Al utilizar la
              aplicación, aceptas cumplir con estos términos. Si tienes alguna
              pregunta o inquietud sobre estos términos, contáctanos en
              hola@barrap.mx.
            </Text>
            <HStack>
              <Checkbox
                isChecked={check}
                onChange={toggle}
                mr={3}
                borderColor="brand.tertiary"
                borderWidth={1}
                value="test"
                bg="transparent"
                accessibilityLabel="This is a dummy checkbox"
              />
              <Text color="white">Acepto los Términos y Condiciones</Text>
            </HStack>
            <Button
              mb={12}
              bg={'brand.tertiary'}
              borderRadius={6}
              _pressed={{opacity: 0.5, backgroundColor: '#C219ED'}}
              _loading={{bg: 'brand.teriary', opacity: 1}}
              isLoading={registerLoading}
              isLoadingText={'CREANDO CUENTA...'}
              onPress={createAccountHandler}>
              CREAR CUENTA
            </Button>
          </VStack>
        </ScrollView>
      </Flex>
    </>
  );
};

export default TermsAndConditions;
