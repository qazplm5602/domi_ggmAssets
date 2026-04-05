import style from "@styles/policy/style.module.scss";

type Props<T extends React.ElementType> = {
    as?: T
} & React.ComponentPropsWithoutRef<T>;

export default function PolicyPrivacyContent<T extends React.ElementType = 'div'>({ as, ...props }: Props<T>) {
    const Tag = as || 'div';

    return (
        <Tag {...props}>
            <div className={style.policy}>

                <section>
                    <p className={style.introText}>
                        GGM 에셋은(는) 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고
                        이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.
                    </p>
                    <p className={style.effectiveDate}>이 개인정보처리방침은 2026년 4월 5일부터 적용됩니다.</p>
                </section>

                <section>
                    <h2>제1조 (개인정보의 처리 목적)</h2>
                    <p>
                        운영팀은 다음의 목적으로만 개인정보를 처리하며, 목적 이외의 용도로는 이용하지 않습니다.
                        목적이 변경되는 경우 「개인정보 보호법」 제18조에 따라 별도의 동의를 받겠습니다.
                    </p>
                    <ul>
                        <li>회원 식별 및 서비스 이용자 확인</li>
                        <li>GGM 에셋(에셋 찾기 서비스) 서비스 제공 및 운영</li>
                        <li>학년별 맞춤 에셋 및 콘텐츠 제공</li>
                    </ul>
                </section>

                <section>
                    <h2>제2조 (수집하는 개인정보 항목 및 수집 방법)</h2>
                    <p>
                        운영팀은 경기게임마이스터고등학교(GGM) 포트폴리오 사이트의 계정을 이용한 SSO(싱글 사인온) 로그인 방식을 통해
                        아래 항목을 자동으로 수집합니다. GGM 포트폴리오 사이트는 본 서비스와 별개의 외부 서비스이며,
                        운영팀은 로그인 인증 목적으로만 해당 계정 정보를 연동합니다.
                    </p>
                    <p className={style.note}>
                        경기게임마이스터고 포트폴리오 사이트는 GGM 에셋과 별도로 운영되며,
                        해당 사이트의 개인정보 처리에 관해서는 해당 사이트의 개인정보처리방침이 적용됩니다.
                    </p>
                    <table>
                        <thead>
                            <tr>
                                <th>항목</th>
                                <th>수집 방법</th>
                                <th>필수 여부</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>이름</td>
                                <td>GGM 계정 연동 자동 수집</td>
                                <td>필수</td>
                            </tr>
                            <tr>
                                <td>학년</td>
                                <td>GGM 계정 연동 자동 수집</td>
                                <td>필수</td>
                            </tr>
                            <tr>
                                <td>식별 아이디 (GGM 고유 ID)</td>
                                <td>GGM 계정 연동 자동 수집</td>
                                <td>필수</td>
                            </tr>
                        </tbody>
                    </table>
                    <p>
                        또한, Google 계정을 이용한 OAuth2 로그인 방식을 통해 아래 항목을 자동으로 수집합니다.
                    </p>
                    <table>
                        <thead>
                            <tr>
                                <th>항목</th>
                                <th>수집 방법</th>
                                <th>필수 여부</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>이름</td>
                                <td>Google 계정 연동 자동 수집</td>
                                <td>필수</td>
                            </tr>
                            <tr>
                                <td>이메일</td>
                                <td>Google 계정 연동 자동 수집</td>
                                <td>필수</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <section>
                    <h2>제3조 (개인정보의 처리 및 보유 기간)</h2>
                    <p>
                        운영팀은 법령에 따른 개인정보 보유·이용 기간 또는 이용자로부터 동의 받은 기간 내에서만
                        개인정보를 처리·보유합니다.
                    </p>
                    <ul>
                        <li>
                            <span className={style.label}>보유 기간:</span>
                            회원 탈퇴 시 즉시 파기. 단, 관계 법령에 의해 보존이 필요한 경우 해당 기간 동안 별도 보관합니다.
                        </li>
                        <li>
                            <span className={style.label}>보유 근거:</span>
                            이용자의 서비스 이용 동의
                        </li>
                    </ul>
                </section>

                <section>
                    <h2>제4조 (개인정보의 파기 절차 및 방법)</h2>
                    <p>
                        개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는
                        지체없이 해당 개인정보를 파기합니다.
                    </p>
                    <ul>
                        <li>
                            <span className={style.label}>전자적 파일 형태:</span>
                            기록을 재생할 수 없는 기술적 방법을 사용합니다.
                        </li>
                        <li>
                            <span className={style.label}>파기 시점:</span>
                            회원 탈퇴 요청 접수 즉시
                        </li>
                    </ul>
                </section>

                <section>
                    <h2>제5조 (개인정보의 제3자 제공)</h2>
                    <p>
                        운영팀은 이용자의 개인정보를 제1조(처리 목적)에서 명시한 범위 내에서만 처리하며,
                        <strong>제3자에게 제공하지 않습니다.</strong>
                        법령에 근거한 수사기관의 적법한 요청이 있는 경우는 예외로 합니다.
                    </p>
                </section>

                <section>
                    <h2>제6조 (개인정보 처리 위탁)</h2>
                    <p>
                        운영팀은 현재 개인정보 처리 업무를 <strong>외부에 위탁하지 않습니다.</strong>
                        향후 위탁이 필요할 경우, 「개인정보 보호법」 제26조에 따라 사전에 고지하겠습니다.
                    </p>
                </section>

                <section>
                    <h2>제7조 (정보주체(이용자)의 권리·의무 및 행사 방법)</h2>
                    <p>
                        이용자(법정대리인 포함)는 언제든지 아래 권리를 행사할 수 있습니다.
                    </p>
                    <ul>
                        <li>개인정보 열람 요구</li>
                        <li>오류 등이 있을 경우 정정 요구</li>
                        <li>삭제 요구</li>
                        <li>처리 정지 요구</li>
                    </ul>
                    <p>
                        위 권리는 개인정보 보호책임자에게 전자우편(domi@domi.kr)으로 요청할 수 있으며,
                        운영팀은 요청 접수 후 15일 이내에 처리하며, 처리가 어려울 경우 그 사유와 처리 예정 일시를 통지합니다.
                    </p>
                    <p className={style.note}>
                        본 서비스는 만 14세 미만 아동의 가입을 허용하지 않습니다.
                        만 14세 미만으로 확인될 경우 즉시 해당 계정의 개인정보를 파기합니다.
                    </p>
                </section>

                <section>
                    <h2>제8조 (개인정보의 안전성 확보 조치)</h2>
                    <p>
                        운영팀은 「개인정보 보호법」 제29조에 따라 다음 조치를 취하고 있습니다.
                    </p>
                    <ul>
                        <li>개인정보에 대한 접근 권한 최소화 및 관리</li>
                        <li>비밀번호 등 인증 정보의 암호화 저장</li>
                        <li>외부 침입 차단을 위한 기술적 보호 조치 적용</li>
                        <li>개인정보 접근 기록 보관 및 위·변조 방지</li>
                    </ul>
                </section>

                <section>
                    <h2>제9조 (쿠키의 설치·운영 및 거부)</h2>
                    <p>
                        운영팀은 로그인 상태 유지를 위해 인증 쿠키를 사용합니다.
                    </p>
                    <ul>
                        <li>
                            <span className={style.label}>접근 토큰(accessToken):</span>
                            로그인 인증 유지 목적, 보유기간 1시간
                        </li>
                        <li>
                            <span className={style.label}>갱신 토큰(refreshToken):</span>
                            접근 토큰 자동 갱신 목적, 보유기간 12시간
                        </li>
                    </ul>
                    <p>
                        이용자는 브라우저 설정을 통해 쿠키 저장을 거부할 수 있으나,
                        거부 시 서비스 로그인 및 일부 기능 이용이 제한될 수 있습니다.
                    </p>
                </section>

                <section>
                    <h2>제10조 (개인정보 보호책임자)</h2>
                    <p>
                        운영팀은 개인정보 처리에 관한 업무를 총괄하고, 개인정보 처리와 관련한 이용자의
                        불만 처리 및 피해 구제를 위해 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
                    </p>
                    <dl>
                        <dt>성명</dt>
                        <dd>도미</dd>
                        <dt>직책</dt>
                        <dd>운영자</dd>
                        <dt>이메일</dt>
                        <dd>domi@domi.kr</dd>
                    </dl>
                    <p className={style.note}>
                        이용자는 「개인정보 보호법」 제55조의 규정에 따른 권익침해 구제를 위해
                        아래 기관에 도움을 요청할 수 있습니다.
                    </p>
                    <ul>
                        <li>개인정보분쟁조정위원회 (www.kopico.go.kr / 1833-6972)</li>
                        <li>개인정보 침해신고센터 (privacy.kisa.or.kr / 118)</li>
                        <li>대검찰청 사이버범죄수사단 (www.spo.go.kr / 1301)</li>
                        <li>경찰청 사이버범죄신고시스템 (ecrm.cyber.go.kr / 182)</li>
                    </ul>
                </section>

                <section>
                    <h2>제11조 (개인정보처리방침의 변경)</h2>
                    <p>
                        이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경 내용의 추가·삭제 및
                        정정이 있는 경우에는 변경 사항의 시행 7일 전부터 서비스 내 공지사항을 통해 고지합니다.
                    </p>
                    <ul>
                        <li>현행 방침 시행일: 2026년 4월 5일</li>
                    </ul>
                </section>

            </div>
        </Tag>
    );
}
