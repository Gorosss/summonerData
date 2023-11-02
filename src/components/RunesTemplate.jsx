import { RuneIconUrl } from '../api/apiCalls.jsx'

import '../css/RunesTemplate.css'



export function RunesStats({ runesIds }) {
    return (
        <>
            <div>
                <div className={runesIds[0] == 5008 ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={5008} />
                </div>
                <div className={runesIds[0] == 5005 ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={5005} />
                </div>
                <div className={runesIds[0] == 5007 ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={5007} />
                </div>

            </div>
            <div>
                <div className={runesIds[1] == 5008 ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={5008} />
                </div>
                <div className={runesIds[1] == 5002 ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={5002} />
                </div>
                <div className={runesIds[1] == 5003 ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={5003} />
                </div>
            </div>
            <div>
                <div className={runesIds[2] == 5001 ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={5001} />
                </div>
                <div className={runesIds[2] == 5002 ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={5002} />
                </div>
                <div className={runesIds[2] == 5003 ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={5003} />
                </div>
            </div>
        </>

    )

}

function PrimaryDominationRune({ runeId }) {

    return (
        <div>
            <div className={runeId === 8112 ? "" : "perkInactive"}>
                <RuneIconUrl runeIconId={8112} />
            </div>
            <div className={runeId === 8124 ? "" : "perkInactive"}>
                <RuneIconUrl runeIconId={8124} />
            </div>
            <div className={runeId === 8128 ? "" : "perkInactive"}>
                <RuneIconUrl runeIconId={8128} />
            </div>
            <div className={runeId === 9923 ? "" : "perkInactive"}>
                <RuneIconUrl runeIconId={9923} />
            </div>
        </div>

    )

}

function PrimaryInspirationRune({ runeId }) {
    return (
        <div>
            <div className={runeId === 8351 ? "" : "perkInactive"}>
                <RuneIconUrl runeIconId={8351} />
            </div>
            <div className={runeId === 8360 ? "" : "perkInactive"}>
                <RuneIconUrl runeIconId={8360} />
            </div>
            <div className={runeId === 8369 ? "" : "perkInactive"}>
                <RuneIconUrl runeIconId={8369} />
            </div>
        </div>
    );
}

function PrimarySorceryRune({ runeId }) {

    return (
        <div>
            <div className={runeId === 8214 ? "" : "perkInactive"}>
                <RuneIconUrl runeIconId={8214} />
            </div>
            <div className={runeId === 8229 ? "" : "perkInactive"}>
                <RuneIconUrl runeIconId={8229} />
            </div>
            <div className={runeId === 8230 ? "" : "perkInactive"}>
                <RuneIconUrl runeIconId={8230} />
            </div>
        </div>

    )

}

function PrimaryPrecisionRune({ runeId }) {
    console.log(runeId)
    return (
        <div>
            <div className={runeId === 8005 ? "" : "perkInactive"}>
                <RuneIconUrl runeIconId={8005} />
            </div>
            <div className={runeId === 8008 ? "" : "perkInactive"}>
                <RuneIconUrl runeIconId={8008} />
            </div>
            <div className={runeId === 8021 ? "" : "perkInactive"}>
                <RuneIconUrl runeIconId={8021} />
            </div>
            <div className={runeId === 8010 ? "" : "perkInactive"}>
                <RuneIconUrl runeIconId={8010} />
            </div>
        </div>
    );
}

function PrimaryResolveRune({ runeId }) {
    return (
        <div>
            <div className={runeId === 8437 ? "" : "perkInactive"}>
                <RuneIconUrl runeIconId={8437} />
            </div>
            <div className={runeId === 8439 ? "" : "perkInactive"}>
                <RuneIconUrl runeIconId={8439} />
            </div>
            <div className={runeId === 8465 ? "" : "perkInactive"}>
                <RuneIconUrl runeIconId={8465} />
            </div>
        </div>
    );
}

function SecondarySorceryRune({ runesIds }) {

    return (
        <>
            <div>
                <div className={runesIds.includes(8224) ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={8224} />
                </div>
                <div className={runesIds.includes(8226) ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={8226} />
                </div>
                <div className={runesIds.includes(8275) ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={8275} />
                </div>

            </div>
            <div>
                <div className={runesIds.includes(8210) ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={8210} />
                </div>
                <div className={runesIds.includes(8234) ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={8234} />
                </div>
                <div className={runesIds.includes(8233) ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={8233} />
                </div>
            </div>
            <div>
                <div className={runesIds.includes(8237) ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={8237} />
                </div>
                <div className={runesIds.includes(8232) ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={8232} />
                </div>
                <div className={runesIds.includes(8236) ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={8236} />
                </div>
            </div>
        </>

    )

}

function SecondaryInspirationRune({ runesIds }) {
    console.log(runesIds)

    return (
        <>
            <div>
                <div className={runesIds.includes(8306) ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={8306} />
                </div>
                <div className={runesIds.includes(8304) ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={8304} />
                </div>
                <div className={runesIds.includes(8313) ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={8313} />
                </div>

            </div>
            <div>
                <div className={runesIds.includes(8321) ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={8321} />
                </div>
                <div className={runesIds.includes(8316) ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={8316} />
                </div>
                <div className={runesIds.includes(8345) ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={8345} />
                </div>
            </div>
            <div>
                <div className={runesIds.includes(8347) ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={8347} />
                </div>
                <div className={runesIds.includes(8410) ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={8410} />
                </div>
                <div className={runesIds.includes(8352) ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={8352} />
                </div>
            </div>
        </>

    )

}

function SecondaryDominationRune({ runesIds }) {

    return (
        <>
            <div>
                <div className={runesIds.includes(8126) ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={8126} />
                </div>
                <div className={runesIds.includes(8139) ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={8139} />
                </div>
                <div className={runesIds.includes(8143) ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={8143} />
                </div>

            </div>
            <div>
                <div className={runesIds.includes(8136) ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={8136} />
                </div>
                <div className={runesIds.includes(8120) ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={8120} />
                </div>
                <div className={runesIds.includes(8138) ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={8138} />
                </div>
            </div>
            <div>
                <div className={runesIds.includes(8135) ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={8135} />
                </div>
                <div className={runesIds.includes(8134) ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={8134} />
                </div>
                <div className={runesIds.includes(8105) ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={8105} />
                </div>
                <div className={runesIds.includes(8106) ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={8106} />
                </div>
            </div>
        </>

    )

}

function SecondaryPrecisionRune({ runesIds }) {
    return (
        <>
            <div>
                <div className={runesIds.includes(9101) ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={9101} />
                </div>
                <div className={runesIds.includes(9111) ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={9111} />
                </div>
                <div className={runesIds.includes(8009) ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={8009} />
                </div>
            </div>
            <div>
                <div className={runesIds.includes(9104) ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={9104} />
                </div>
                <div className={runesIds.includes(9105) ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={9105} />
                </div>
                <div className={runesIds.includes(9103) ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={9103} />
                </div>
            </div>
            <div>
                <div className={runesIds.includes(8014) ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={8014} />
                </div>
                <div className={runesIds.includes(8017) ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={8017} />
                </div>
                <div className={runesIds.includes(8299) ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={8299} />
                </div>
            </div>
        </>
    );
}

function SecondaryResolveRune({ runesIds }) {
    return (
        <>
            <div>
                <div className={runesIds.includes(8446) ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={8446} />
                </div>
                <div className={runesIds.includes(8463) ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={8463} />
                </div>
                <div className={runesIds.includes(8401) ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={8401} />
                </div>
            </div>
            <div>
                <div className={runesIds.includes(8429) ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={8429} />
                </div>
                <div className={runesIds.includes(8444) ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={8444} />
                </div>
                <div className={runesIds.includes(8473) ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={8473} />
                </div>
            </div>
            <div>
                <div className={runesIds.includes(8451) ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={8451} />
                </div>
                <div className={runesIds.includes(8453) ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={8453} />
                </div>
                <div className={runesIds.includes(8242) ? "" : "perkInactive"}>
                    <RuneIconUrl runeIconId={8242} />
                </div>
            </div>
        </>
    );
}


function getPrimaryRunesComponent(perkStyle, runeId) {
    console.log(runeId)

    switch (perkStyle) {
        case 8000:
            return <PrimaryPrecisionRune runeId={runeId} />;
        case 8100:
            return <PrimaryDominationRune runeId={runeId} />;
        case 8200:
            return <PrimarySorceryRune runeId={runeId} />;
        case 8300:
            return <PrimaryInspirationRune runeId={runeId} />;
        case 8400:
            return <PrimaryResolveRune runeId={runeId} />;
        default:
            return null;
    }
}

function getSecondaryRunesComponent(perkSubStyle, runesIds) {
    console.log(runesIds)

    switch (perkSubStyle) {
        case 8000:
            return <SecondaryPrecisionRune runesIds={runesIds} />;
        case 8100:
            return <SecondaryDominationRune runesIds={runesIds} />;
        case 8200:
            return <SecondarySorceryRune runesIds={runesIds} />;
        case 8300:
            return <SecondaryInspirationRune runesIds={runesIds} />;
        case 8400:
            return <SecondaryResolveRune runesIds={runesIds} />;
        default:
            return null; 
    }
}
export function GetPrimaryRunes({ perkStyle, runeId }) {
    const primaryRunesComponent = getPrimaryRunesComponent(perkStyle, runeId);
    return (
        <>
            {primaryRunesComponent}
        </>
    )
}

export function GetSecondaryRunes({ perkSubStyle, runesIds }) {
    const secondaryRunesComponent = getSecondaryRunesComponent(perkSubStyle, runesIds);
    return (
        <>
            {secondaryRunesComponent}
        </>
    );
}