import { Lock, Shield, TriangleAlert } from "lucide-react";
import Card from "../../components/card";
import CardBranco from "../../components/cardBranco";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import '../../styles/privacidade.css'

// arrumar o tamanho de todos os placeholders

export default function Privacidade() {
    return (
        <div className="containerGeral">
            <Sidebar />
            <div className="containerPage">
                <Header />
                <h2 className="tituloPage">Privacidade </h2>

                <div className="containerCards">

                    <CardBranco>
                        <div className="cardPage">
                            <h3 className="tituloCard">Segurança</h3>

                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2em' }}>
                                <Card>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
                                        <div style={{ display: 'flex', backgroundColor: '#CBE7D7', padding: '0.8em', borderRadius: '50%', alignItems: 'center', justifyContent: 'center' }}>
                                            <Shield color="#0BA554" size={30} strokeWidth={1.5} />
                                        </div>

                                        <div>
                                            <h3 className="tituloCardProtegido">Conta Protegida</h3>
                                            <h4 className="subtituloCardProtegido">Seus dados estão protegidos com o nosso site</h4>
                                        </div>
                                    </div>
                                </Card>
                            </div>


                            <div style={{ padding: '0px 40px', flex: 1, marginBottom: '3em' }}>

                                <div style={{display: 'flex', gap: '0.8em'}}>
                                    <Lock color="#CE221E" strokeWidth={1.5} />
                                    <h3 className="tituloPequenoPrivacidade">Alterar senha</h3>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                                    <div className="grupoInputLabel">
                                        <label htmlFor="senhaAtual" className="labelAddMembro">Senha atual</label>
                                        <input type="password" name="senhaAtual" id="senhaAtual" placeholder="Digite sua senha atual" className="inputAdd" />
                                    </div>

                                    <div className="grupoInputLabel">
                                        <label htmlFor="novaSenha" className="labelAddMembro">Nova senha</label>
                                        <input type="password" name="novaSenha" id="novaSenha" placeholder="Crie sua nova senha" className="inputAdd" />
                                    </div>

                                    <div className="grupoInputLabel">
                                        <label htmlFor="confirmar" className="labelAddMembro">Confirmar senha</label>
                                        <input type="password" name="confirmar" id="confirmar" placeholder="Confirme sua senha criada" className="inputAdd" />
                                    </div>
                                </div>
                                <div className="btnDiv">
                                    <button type="submit" className="btn">Alterar senha</button>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center' }}>

                                <div style={{ padding: '0px 40px', justifyContent: 'center', width: '32em' }}>
                                    <Card>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1em', marginBottom: '1em', }}>
                                            <TriangleAlert color="#C98D24" size={30} strokeWidth={1.5} />

                                            <h3 className="tituloCardDicas">Dicas de Segurança</h3>
                                        </div>

                                        <ul className="listaDicas">
                                            <li>Use senhas únicas e complexas</li>
                                            <li>Mantenha o aplicativo sempre atualizado</li>
                                            <li>Não compartilhe suas credenciais</li>
                                            <li>Faça logout em dispositivos desconhecidos</li>
                                        </ul>
                                    </Card>
                                </div>
                            </div>

                        </div>
                    </CardBranco>

                    <CardBranco>
                        <div className="cardPage">
                            <h3 className="tituloCard">Política de Privacidade</h3>

                            <div style={{ padding: '0px 40px', flex: 1 }}>
                                <p>A MainTech valoriza a sua privacidade e está comprometida em proteger os dados pessoais coletados
                                    durante a prestação dos nossos serviços de gestão e prevenção de máquinas industriais.
                                    Esta Política de Privacidade explica como coletamos, usamos, armazenamos e protegemos as informações que você nos fornece.

                                    <ul className="listaPrivacidade">
                                        <li>
                                            Coletamos informações pessoais e profissionais necessárias para oferecer nossos serviços, como nome,
                                            cargo, e-mail, telefone, dados da empresa e informações técnicas relacionadas aos equipamentos industriais.
                                        </li>
                                        <li>Os dados coletados são utilizados para:
                                            Realizar a gestão preventiva e manutenção das máquinas industriais;
                                            Comunicar atualizações, relatórios e suporte técnico;
                                            Melhorar a qualidade dos serviços prestados;
                                            Atender obrigações legais e regulatórias.
                                        </li>
                                        <li>
                                            Compartilhamos informações apenas com parceiros e fornecedores essenciais para a execução dos serviços,
                                            sempre garantindo confidencialidade e segurança. Não vendemos ou alugamos dados pessoais a terceiros.
                                        </li>
                                        <li>
                                            Adotamos medidas técnicas e administrativas para proteger suas informações contra acessos não autorizados,
                                            vazamentos, perda ou alterações indevidas.
                                        </li>
                                        <li>
                                            Você tem direito de acessar, corrigir, solicitar a exclusão dos seus dados pessoais, bem como revogar o
                                            consentimento para o tratamento, conforme previsto na legislação vigente.
                                        </li>
                                        <li>
                                            Os dados serão mantidos pelo tempo necessário para cumprir as finalidades da coleta e as obrigações
                                            legais aplicáveis.
                                        </li>
                                    </ul>
                                    <p>Para esclarecer dúvidas, solicitar informações ou exercer seus direitos relacionados à privacidade, entre em
                                        contato conosco pelo e-mail: maintech@gmail.com .</p>

                                </p>
                            </div>
                        </div>
                    </CardBranco>

                </div>
            </div>
        </div>
    )
}