module Main exposing (main)

import Browser exposing (Document)
import Debug exposing (toString)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)
import Markdown
import Random exposing (Seed)
import Task
import Time


main =
    Browser.document
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }


type alias Flags =
    { currentTime : Int }



-- INIT


init : Flags -> ( Model, Cmd Msg )
init flags =
    ( { characterType = SelectCharacter
      , screenType = MakeMove
      , level = 1
      , mod = 0
      , seed = Random.initialSeed flags.currentTime
      , roll = ""
      }
    , Cmd.none
    )



-- UPDATE


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Noop ->
            ( model, Cmd.none )

        ChangeCharacter player ->
            ( { model | characterType = playerToCharacterType player }
            , Cmd.none
            )

        ChangeLevel levelString ->
            ( { model | level = levelStringToLevel levelString }
            , Cmd.none
            )

        ChangeScreenType screenType ->
            ( { model | screenType = screenType }
            , Cmd.none
            )

        SetSeed currentTime ->
            setSeed model currentTime

        Roll rollType ->
            ( { model | roll = "Roll Result: " ++ rollResult model rollType }
            , Task.perform SetSeed Time.now
            )

        ResetRoll ->
            ( { model | roll = "" }
            , Cmd.none
            )



-- VIEW


view : Model -> Document Msg
view model =
    Document
        "Dī Penātēs"
        [ div [ class "container" ]
            [ viewHeader model
            , br [] []
            , viewContent model
            , br [] []
            , viewFooter
            ]
        ]



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none



-- SECTION: TYPES


type alias Model =
    { characterType : CharacterType
    , screenType : ScreenType
    , level : Int
    , mod : Int
    , seed : Seed
    , roll : String
    }


type alias Character =
    { str : Int
    , dex : Int
    , con : Int
    , wis : Int
    , int : Int
    , cha : Int
    , moves : List MoveSet
    , name : String
    , desc : String
    , twist : String
    , finale : String
    , origin : String
    , type_ : CharacterType
    , baseHP : Int
    , baseDamage : RollType
    , statIncreases : List String
    }


type alias CharacterLegacy =
    { str : Int
    , dex : Int
    , con : Int
    , wis : Int
    , int : Int
    , cha : Int
    , moves : List MoveGroup

    --, movesTabletop : List MoveGroup
    , name : String
    , desc : String
    , origin : String
    , type_ : CharacterType
    }


type alias MoveGroup =
    -- legacy
    { title : String
    , moves : List MoveLegacy --TODO upgrade
    }


type alias MoveSet =
    { title : String
    , id : String
    , moves : List Move
    }


type alias Move =
    { type_ : MoveType
    , title : String
    , desc : String
    , roll : List RollType
    , level : Int
    }


moveTypeToString : MoveType -> String
moveTypeToString type_ =
    toString type_


type MoveType
    = UseExternalMove
    | RevealUnwelcomeTruth
    | ShowSignsThreat
    | DealDamage
    | UseUpResources
    | TurnMoveBack
    | SeparateThem
    | GiveOpportunityAbilityFit
    | ShowDownside
    | GiveOpportunityWithWithoutCost
    | PutSomeoneInASpot
    | ConsequencesAndAsk
    | ChangeEnvironment
    | PointLoomingThreat
    | IntroduceNewFaction
    | UseExistingThreat
    | MakeThemBacktrack
    | PresentRichesPrice
    | PresentChallengesToOne
    | SpoutLore
    | DiscernRealities
    | HackSlash
    | Volley
    | Defend
    | Parley
    | DefyDanger
    | DefyDangerStr
    | DefyDangerCon
    | DefyDangerDex
    | DefyDangerWis
    | DefyDangerInt
    | DefyDangerCha
    | ArcaneArt
    | LoreExpert
    | SpellWizardPrestidigitation
    | SpellWizardUnseenServant
    | SpellWizardLight
    | SpellWizardCharmPerson
    | SpellWizardContactSpirits
    | SpellWizardAlarm
    | SpellWizardInvisibility
    | SpellWizardMagicMissile
    | SpellWizardDetectMagic
    | SpellWizardDispelMagic
    | SpellWizardSleep
    | SpellWizardPolymorph
    | SpellWizardFireball
    | SpellDefense
    | Ritual
    | Logical
    | FountOfKnowledge
    | Counterspell
    | QuickStudy
    | WizardCastSpell
    | BornOfTheSoil
    | ByNatureSustained
    | SpiritTongue
    | Shapeshifter
    | StudiedEssence
    | HuntersBrother
    | RedOfToothAndClaw
    | ThingTalker
    | CommunionOfWhispers
    | ElementalMastery
    | Professional
    | Poisoner
    | Backstab
    | TricksOfTheTrade
    | TrapExpert
    | Cautious
    | Connections
    | ShootFirst
    | CheapShot
    | PortStorm
    | CharmingOpen
    | Cacophony
    | EldritchTones
    | HealingSong
    | ViciousCacophony
    | MulticlassDabbler
    | HercApp
    | TheUpperHand
    | Musclebound
    | WhatAreYouWaitingFor
    | FullPlatePackingSteel
    | WideWanderer
    | Samson
    | Smash
    | Usurper
    | EyeForWeakness
    | Deity
    | DivineGuidance
    | TurnUndead
    | ClericCastSpell
    | SpellClericLight
    | SpellClericSanctify
    | SpellClericGuidance
    | SpellClericCureLightWounds
    | SpellClericSpeakWithDead
    | SpellClericCauseFear
    | SpellClericMagicWeapon
    | SpellClericSanctuary
    | SpellClericRes
    | SpellClericBless
    | SpellClericCureModerateWounds
    | SpellClericHoldPerson
    | SpellClericTrueSeeing
    | SpellClericRevelation
    | SpellClericAnimateDead
    | SpellClericDarkness
    | Serenity
    | DivineIntervention
    | DevotedHealer
    | OrisonForGuidance
    | BendBarsLiftGates
    | Armored
    | SignatureWeapon
    | Hospitaller
    | BloodyAegis
    | Merciless
    | Exterminus
    | ArmorMastery
    | Interrogator
    | Heirloom
    | HuntAndTrack
    | CalledShot
    | AnimalCompanion
    | GodAmidstTheWastes
    | FamiliarPrey
    | WildEmpathy
    | BlotOutTheSun
    | LayOnHands
    | Law
    | Quest
    | DivineFavor


type alias MoveLegacy =
    { desc : String
    , roll : Maybe RollLegacy
    , level : Int
    }


type RollType
    = RollCha
    | RollWis
    | RollInt
    | RollCon
    | RollDex
    | RollStr
    | RollFour
    | RollSix
    | RollEight
    | RollTen
    | RollTwelve
    | RollReason String RollType


type alias RollLegacy =
    { mod : String
    , dice : List Int
    }


type CharacterType
    = SelectCharacter
    | TheDirector
    | TheCaptain
    | TheFirstMate
    | TheSecurity
    | TheIntelligence
    | ThePilot
    | TheNavigator
    | TheEngineer
    | TheBiomechanic
    | TheScientist
    | TheSmuggler
    | CharacterTypeError


type ScreenType
    = ViewCharacters
    | MakeMove
    | CharacterSheet
    | Inventory
    | CharacterChoices
    | Prep
    | ScreenTypeError



-- SECTION: CHARACTERS


characters : List Character
characters =
    [ theCaptain
    , theFirstMate
    , theSecurity
    , theIntelligence
    , thePilot
    , theNavigator
    , theEngineer
    , theBiomechanic
    , theScientist
    ]



-- CHARACTERS SUB-SECTION: Stats and Description


theSmuggler : Character
theSmuggler =
    { str = 13
    , dex = 8
    , con = 9
    , wis = 15
    , int = 12
    , cha = 16
    , moves = theSmugglerSpellbookMoveSet ++ theSmugglerMoveSet ++ basicMoveSet
    , name = "The Smuggler"
    , desc = "" --TODO contentTheSmuggler
    , twist = ""
    , finale = ""
    , origin = "The Wizard"
    , type_ = TheSmuggler
    , baseHP = 4
    , baseDamage = RollFour
    , statIncreases = [] --TODO
    }


theCaptain : Character
theCaptain =
    { str = 15
    , dex = 8
    , con = 13
    , wis = 12
    , int = 9
    , cha = 16
    , moves = theCaptainMoveSet ++ basicMoveSet
    , name = "The Captain"
    , desc = contentTheCaptain
    , twist = contentTheCaptainTwist
    , finale = contentTheCaptainFinale
    , origin = "The Paladin"
    , type_ = TheCaptain
    , baseHP = 10
    , baseDamage = RollTen
    , statIncreases =
        [ "wis", "str", "cha", "cha" ]
    }



-- CHARACTER SUB-SECTION: The First Mate (Bard)


theFirstMate : Character
theFirstMate =
    { str = 9
    , dex = 8
    , con = 12
    , wis = 13
    , int = 15
    , cha = 16
    , moves = theFirstMateMoveSet ++ basicMoveSet
    , name = "The First Mate"
    , desc = contentTheFirstMate
    , twist = contentTheFirstMateTwist
    , finale = contentTheFirstMateFinale
    , origin = "The Bard"
    , type_ = TheFirstMate
    , baseHP = 6
    , baseDamage = RollSix
    , statIncreases =
        [ "int", "cha", "cha", "con" ]
    }



-- The Security (Fighter)


theSecurity : Character
theSecurity =
    { str = 16
    , dex = 8
    , con = 15
    , wis = 12
    , int = 9
    , cha = 13
    , moves = theSecurityMoveSet ++ basicMoveSet
    , name = "The Security Officer"
    , desc = contentSecurityOfficer
    , twist = contentSecurityOfficerTwist
    , finale = contentSecurityOfficerFinale
    , origin = "The Fighter"
    , type_ = TheSecurity
    , baseHP = 10
    , baseDamage = RollTen
    , statIncreases =
        [ "con", "dex", "str", "str" ]
    }



-- The Intelligence (Thief)


theIntelligence : Character
theIntelligence =
    { str = 12
    , dex = 16
    , con = 8
    , wis = 9
    , int = 13
    , cha = 15
    , moves = theIntelligenceMoveSet ++ basicMoveSet
    , name = "The Intelligence Officer"
    , desc = contentIntelligence
    , twist = contentIntelligenceTwist
    , finale = contentIntelligenceFinale
    , origin = "The Thief"
    , type_ = TheIntelligence
    , baseHP = 6
    , baseDamage = RollFour
    , statIncreases =
        [ "dex", "dex", "cha", "con" ]
    }



-- The Pilot (Cleric)


thePilot : Character
thePilot =
    { str = 8
    , dex = 15
    , con = 9
    , wis = 13
    , int = 16
    , cha = 12
    , moves =
        thePilotSpellbookMoveSet
            ++ thePilotMoveSet
            ++ basicMoveSet
    , name = "The Pilot"
    , desc = contentThePilot
    , twist = contentThePilotTwist
    , finale = contentThePilotFinale
    , origin = "The Wizard"
    , type_ = ThePilot
    , baseHP = 4
    , baseDamage = RollFour
    , statIncreases =
        [ "int", "int", "dex", "con" ]
    }



-- The Navigator (Ranger)


theNavigator : Character
theNavigator =
    { str = 8
    , dex = 15
    , con = 13
    , wis = 16
    , int = 9
    , cha = 12
    , moves = theNavigatorMoveSet ++ basicMoveSet
    , name = "The Navigation Officer"
    , desc = contentTheNavigator
    , twist = contentTheNavigatorTwist
    , finale = contentTheNavigatorFinale
    , origin = "The Ranger"
    , type_ = TheNavigator
    , baseHP = 8
    , baseDamage = RollEight
    , statIncreases =
        [ "dex", "wis", "wis", "con" ]
    }



-- The Engineer (Druid)


theEngineer : Character
theEngineer =
    { str = 15
    , dex = 8
    , con = 13
    , wis = 16
    , int = 12
    , cha = 9
    , moves = theEngineerMoveSet ++ basicMoveSet
    , name = "The Engineering Officer"
    , desc = contentTheEngineer
    , twist = contentTheEngineerTwist
    , finale = contentTheEngineerFinale
    , origin = "The Druid"
    , type_ = TheEngineer
    , baseHP = 6
    , baseDamage = RollSix
    , statIncreases =
        [ "int", "wis", "str", "wis" ]
    }



-- The Biomechanic (Wizard)


theBiomechanic : Character
theBiomechanic =
    { str = 13
    , dex = 8
    , con = 15
    , wis = 16
    , int = 12
    , cha = 9
    , moves =
        theBiomechanicSpellbookMoveSet
            ++ theBiomechanicMoveSet
            ++ basicMoveSet
    , name = "The Biomechanic"
    , desc = contentTheBiomechanic
    , twist = contentTheBiomechanicTwist
    , finale = contentTheBiomechanicFinale
    , origin = "The Cleric"
    , type_ = TheBiomechanic
    , baseHP = 8
    , baseDamage = RollSix
    , statIncreases =
        [ "wis", "wis", "con", "int" ]
    }



-- The Scientist (Barbarian)


theScientist : Character
theScientist =
    { str = 15
    , dex = 8
    , con = 16
    , wis = 13
    , int = 12
    , cha = 9
    , moves = theScientistMoveSet ++ basicMoveSet
    , name = "The Scientist"
    , desc = contentTheScientist
    , twist = contentTheScientistTwist
    , finale = contentTheScientistFinale
    , origin = "The Barbarian"
    , type_ = TheScientist
    , baseHP = 8
    , baseDamage = RollTen
    , statIncreases =
        [ "con", "con", "str", "int" ]
    }



-- SECTION: MOVES


theDirectorMoves : List MoveSet
theDirectorMoves =
    [ { title = "The Director's Moves"
      , id = "DirectorMoves"
      , moves =
            [ { type_ = UseExternalMove
              , title = "Use a monster, danger, or location move"
              , desc = contentUseExternalMove
              , roll = []
              , level = 1
              }
            , { type_ = RevealUnwelcomeTruth
              , title = "Reveal an unwelcome truth"
              , desc = """
An unwelcome truth is a fact the players wish wasn’t true: that the room’s been trapped, maybe, or that the helpful goblin is actually a spy. Reveal to the players just how much trouble they’re in.
              """
              , roll = []
              , level = 1
              }
            , { type_ = ShowSignsThreat
              , title = "Show signs of an approaching threat"
              , desc = """
This is one of your most versatile moves. “Threat” means anything bad that’s on the way. With this move, you just show them that something’s going to happen unless they do something about it.
              """
              , roll = []
              , level = 1
              }
            , { type_ = DealDamage
              , title = "Deal damage"
              , desc = contentDealDamage
              , roll = []
              , level = 1
              }
            , { type_ = UseUpResources
              , title = "Use up their resources"
              , desc = """
Surviving in a dungeon, or anywhere dangerous, often comes down to supplies. With this move, something happens to use up some resource: weapons, armor, healing, ongoing spells. You don’t always have to use it up permanently. A sword might just be flung to the other side of the room, not shattered.
              """
              , roll = []
              , level = 1
              }
            , { type_ = TurnMoveBack
              , title = "Turn their move back on them"
              , desc = contentTurnMoveBack
              , roll = []
              , level = 1
              }
            , { type_ = SeparateThem
              , title = "Separate them"
              , desc = """
There are few things worse than being in the middle of a raging battle with blood-thirsty owlbears on all sides—one of those things is being in the middle of that battle with no one at your back.

Separating the characters can mean anything from being pushed apart in the heat of battle to being teleported to the far end of the dungeon. Whatever way it occurs, it’s bound to cause problems.
              """
              , roll = []
              , level = 1
              }
            , { type_ = GiveOpportunityAbilityFit
              , title = "Give an opportunity that fits an adventurer's abilities"
              , desc = """
The thief disables traps, sneaks, and picks locks. The cleric deals with the divine and the dead. Every class has things that they shine at—present an opportunity that plays to what one class shines at.

It doesn’t have to be a class that’s in play right now though. Sometimes a locked door stands between you and treasure and there’s no thief in sight. This is an invitation for invention, bargaining, and creativity. If all you’ve got is a bloody axe doesn’t every problem look like a skull?
              """
              , roll = []
              , level = 1
              }
            , { type_ = ShowDownside
              , title = "Show a downside to an aspect of a character"
              , desc = """
Just as every class shines, they all have their weaknesses too. Do orcs have a special thirst for elven blood? Is the cleric’s magic disturbing dangerous forces? The torch that lights the way also draws attention from eyes in the dark.
              """
              , roll = []
              , level = 1
              }
            , { type_ = GiveOpportunityWithWithoutCost
              , title = "Offer an opportunity, with or without cost"
              , desc = """
Show them something they want: riches, power, glory. If you want, you can associate some cost with it too, of course.

Remember to lead with the fiction. You don’t say, “This area isn’t dangerous so you can make camp here, if you’re willing to take the time.” You make it a solid fictional thing and say, “Helferth’s blessings still hang around the shattered altar. It’s a nice safe spot, but the chanting from the ritual chamber is getting louder. What do you do?”
              """
              , roll = []
              , level = 1
              }
            , { type_ = PutSomeoneInASpot
              , title = "Put someone in a spot"
              , desc = """
A spot is someplace where a character needs to make tough choices. Put them, or something they care about, in the path of destruction. The harder the choice, the tougher the spot.
              """
              , roll = []
              , level = 1
              }
            , { type_ = ConsequencesAndAsk
              , title = "Tell them the requirements or consequences and ask"
              , desc = """
This move is particularly good when they want something that’s not covered by a move, or they’ve failed a move. They can do it, sure, but they’ll have to pay the price. Or, they can do it, but there will be consequences. Maybe they can swim through the shark-infested moat before being devoured, but they’ll need a distraction. Of course, this is made clear to the characters, not just the players: the sharks are in a starved frenzy, for example.
              """
              , roll = []
              , level = 1
              }
            ]
      }
    , { title = "Dungeon Moves"
      , id = "DungeonMoves"
      , moves =
            [ { type_ = ChangeEnvironment
              , title = "Change the environment"
              , desc = contentChangeEnvironment
              , roll = []
              , level = 1
              }
            , { type_ = PointLoomingThreat
              , title = "Point to a looming threat"
              , desc = """
If you know that something is lurking and waiting for the players to stumble upon it, this move shows them the signs and clues. This move is the dragon’s footprints in the mud or the slimy trail of the gelatinous cube.
              """
              , roll = []
              , level = 1
              }
            , { type_ = IntroduceNewFaction
              , title = "Introduce a new faction or type of creature"
              , desc = contentIntroduceNewFaction
              , roll = []
              , level = 1
              }
            , { type_ = UseExistingThreat
              , title = "Use a threat from an existing faction or type of creature"
              , desc = """
Once the characters have been introduced to the presence of a faction or type of creature you can use moves of monsters of that type.

Use the factions and types broadly. Orcs are accompanied with their hunting worgs. A mad cult probably has some undead servants or maybe a few beasts summoned from the abyssal pits. This is a move that, often, you’ll be making subconsciously—it’s just implementing the tools you’ve set out for yourself in a clear and effective manner.
               """
              , roll = []
              , level = 1
              }
            , { type_ = MakeThemBacktrack
              , title = "Make them backtrack"
              , desc = """
Look back at the spaces you’ve added to the map. Is there anything useful there as yet undiscovered? Can you add a new obstacle that can only be overcome by going back there? Is there a locked door here and now whose key lies in an earlier room?

When backtracking, show the effect that time has had on the areas they’ve left behind. What new threats have sprung up in their wake? What didn’t they take care of that’s waiting for their return?

Use this move the make the dungeon a living, breathing place. There is no stasis in the wake of the characters’ passing. Add reinforcements, cave in walls, cause chaos. The dungeon evolves in the wake of the characters’ actions.
              """
              , roll = []
              , level = 1
              }
            , { type_ = PresentRichesPrice
              , title = "Present riches at a price"
              , desc = """
What do the players want? What would they sacrifice for it?

Put some desirable item just out of reach. Find something they’re short on: time, HP, gear, whatever. Find a way to make what they want available if they give up what they have.

The simplest way to use this move is the promise of gold out of the way of the main objective. Will they stop to pry the ruby eyes from the idol when they know that the sacrifice looms closer and closer? Use this move and you can find out.
              """
              , roll = []
              , level = 1
              }
            , { type_ = PresentChallengesToOne
              , title = "Present challenges to one of the characters"
              , desc = """
Challenge a character by looking at what they’re good at. Give the thief a lock to pick, show the cleric servants of an enemy god to battle against. Give the wizard magical mysteries to investigate. Show the fighter some skulls to crack. Give someone a chance to shine.

As an alternative, challenge a character by looking at what they’re bad at or what they’ve left unresolved. If the bard has a complicated lie on his conscience, what steps will he take to cover it up when someone figures him out? If the wizard has been summoning demons, what happens when word gets out?

This move can give a character the spotlight—even if just for a moment. Try to give everyone a chance to be the focus of play using this move from session to session.
              """
              , roll = []
              , level = 1
              }
            ]
      }
    ]


theCaptainMoveSet : List MoveSet
theCaptainMoveSet =
    [ { title = "The Captain's Moves"
      , moves = theCaptainMoves
      , id = "CaptainMoves"
      }
    , { title = "The Captain's Spellbook"
      , moves = theCaptainSpellbookMoves
      , id = "CaptainSpellbookMoves"
      }
    ]


theFirstMateMoveSet : List MoveSet
theFirstMateMoveSet =
    [ { title = "The First Mate's Moves"
      , moves = theFirstMateMoves
      , id = "FirstMateMoves"
      }
    , { title = "The First Mate's Spellbook"
      , moves = theFirstMateSpellbookMoves
      , id = "FirstMateSpellbookMoves"
      }
    ]


theSecurityMoveSet : List MoveSet
theSecurityMoveSet =
    [ { title = "The Security Officer's Moves"
      , moves = theSecurityMoves
      , id = "SecurityOfficerMoves"
      }
    ]


theIntelligenceMoveSet : List MoveSet
theIntelligenceMoveSet =
    [ { title = "The Intelligence Officer's Moves"
      , moves = theIntelligenceMoves
      , id = "IntelligenceOfficerMoves"
      }
    ]


theScientistMoveSet : List MoveSet
theScientistMoveSet =
    [ { title = "The Scientist's Moves"
      , moves = theScientistMoves
      , id = "ScientistMoves"
      }
    ]


thePilotMoveSet : List MoveSet
thePilotMoveSet =
    [ { title = "The Pilot's Moves"
      , moves = thePilotMoves
      , id = "PilotMoves"
      }
    ]


theBiomechanicMoveSet : List MoveSet
theBiomechanicMoveSet =
    [ { title = "The Biomechanic's Moves"
      , moves = theBiomechanicMoves
      , id = "BiomechanicMoves"
      }
    ]


theBiomechanicSpellbookMoveSet : List MoveSet
theBiomechanicSpellbookMoveSet =
    [ { title = "The Biomechanic's Spellbook"
      , moves = theBiomechanicSpellbookMoves
      , id = "BiomechanicSpellbook"
      }
    ]


theNavigatorMoveSet : List MoveSet
theNavigatorMoveSet =
    [ { title = "The Navigation Officer's Moves"
      , moves = theNavigatorMoves
      , id = "NavigatorMoves"
      }
    , { title = "The Navigation Officer's Spellbook"
      , moves = theNavigatorSpellbookMoves
      , id = "NavigatorSpellbookMoves"
      }
    ]


theEngineerMoveSet : List MoveSet
theEngineerMoveSet =
    [ { title = "The Engineering Officer's Moves"
      , moves = theEngineerMoves
      , id = "EngineerMoves"
      }
    ]


theSmugglerSpellbookMoveSet : List MoveSet
theSmugglerSpellbookMoveSet =
    [ { title = "The Smuggler's Spellbook"
      , moves = theSmugglerSpellbookMoves
      , id = "SmugglerSpellbook"
      }
    ]


thePilotSpellbookMoveSet : List MoveSet
thePilotSpellbookMoveSet =
    [ { title = "The Pilot's Spellbook"
      , moves = thePilotSpellbookMoves
      , id = "PilotSpellbook"
      }
    ]


theSmugglerMoveSet : List MoveSet
theSmugglerMoveSet =
    [ { title = "The Smuggler's Moves"
      , moves = theSmugglerMoves
      , id = "SmugglerMoves"
      }
    ]


theCaptainMoves : List Move
theCaptainMoves =
    [ { type_ = LayOnHands
      , title = "Lay On Hands"
      , desc = contentLayOnHands
      , roll = [ RollCha ]
      , level = 1
      }
    , { type_ = Armored
      , title = "Armored"
      , desc = contentArmored
      , roll = []
      , level = 1
      }
    , { type_ = Law
      , title = "I Am The Law"
      , desc = contentLaw
      , roll = [ RollCha ]
      , level = 1
      }
    , { type_ = Quest
      , title = "Quest"
      , desc = contentQuest
      , roll = []
      , level = 1
      }
    , { type_ = DivineFavor
      , title = "Divine Favor"
      , desc = contentDivineFavor
      , roll = []
      , level = 2
      }
    , { type_ = BloodyAegis
      , title = "Bloody Aegis"
      , desc = contentBloodyAegis
      , roll = []
      , level = 3
      }
    , { type_ = Hospitaller
      , title = "Hospitaller"
      , desc = contentHospitaller
      , roll = []
      , level = 4
      }
    , { type_ = Exterminus
      , title = "Exterminus"
      , desc = contentExterminus
      , roll = []
      , level = 5
      }
    ]


theFirstMateMoves : List Move
theFirstMateMoves =
    [ { type_ = ArcaneArt
      , title = "Arcane Art"
      , desc = contentArcaneArt
      , roll = [ RollCha ]
      , level = 1
      }
    , { type_ = LoreExpert
      , title = "Bardic Lore"
      , desc = contentLoreExpert
      , roll = []
      , level = 1
      }
    , { type_ = CharmingOpen
      , title = "Charming and Open"
      , desc = contentCharmingOpen
      , roll = []
      , level = 1
      }
    , { type_ = PortStorm
      , title = "A Port in the Storm"
      , desc = contentPortStorm
      , roll = []
      , level = 1
      }
    , { type_ = MulticlassDabbler
      , title = "Multiclass Dabbler"
      , desc = contentMulticlassDabbler
      , roll = []
      , level = 2
      }
    , { type_ = EldritchTones
      , title = "Eldritch Tones"
      , desc = contentEldritchTones
      , roll = []
      , level = 3
      }
    , { type_ = ViciousCacophony
      , title = "Vicious Cacophony"
      , desc = contentViciousCacophony
      , roll = []
      , level = 4
      }
    , { type_ = HealingSong
      , title = "Healing Song"
      , desc = contentHealingSong
      , roll = []
      , level = 5
      }
    ]


basicMoveSet : List MoveSet
basicMoveSet =
    [ { title = "Exploration Moves"
      , moves = explorationMoves
      , id = "ExplorationMoves"
      }
    , { title = "Defy Danger"
      , moves = defyDangerMoves
      , id = "DefyDanger"
      }
    , { title = "Combat Moves"
      , moves = combatMoves
      , id = "CombatMoves"
      }
    ]


combatMoves =
    [ { type_ = HackSlash
      , title = "Hack and Slash"
      , desc = contentHackSlash
      , roll = [ RollStr ]
      , level = 1
      }
    , { type_ = Volley
      , title = "Volley"
      , desc = contentVolley
      , roll = [ RollDex ]
      , level = 1
      }
    , { type_ = Defend
      , title = "Defend"
      , desc = contentDefend
      , roll = [ RollCon ]
      , level = 1
      }
    , { type_ = Parley
      , title = "Parley"
      , desc = contentParley
      , roll = [ RollCha ]
      , level = 1
      }
    ]


explorationMoves =
    [ { type_ = SpoutLore
      , title = "Spout Lore"
      , desc = contentSpoutLore
      , roll =
            [ RollInt ]
      , level = 1
      }
    , { type_ = DiscernRealities
      , title = "Discern Realities"
      , desc = contentDiscernRealities
      , roll = [ RollWis ]
      , level = 1
      }
    ]


strDefyDanger =
    "by powering through, "


dexDefyDanger =
    "by getting out of the way or acting fast, "


conDefyDanger =
    "by enduring, "


intDefyDanger =
    "with quick thinking, "


wisDefyDanger =
    "through mental fortitude, "


chaDefyDanger =
    "using charm and social grace, "


defyDangerMoves : List Move
defyDangerMoves =
    [ { type_ = DefyDanger
      , title = "Defy Danger"
      , desc = contentDefyDanger
      , roll =
            [ RollReason strDefyDanger RollStr
            , RollReason dexDefyDanger RollDex
            , RollReason conDefyDanger RollCon
            , RollReason intDefyDanger RollInt
            , RollReason wisDefyDanger RollWis
            , RollReason chaDefyDanger RollCha
            ]
      , level = 1
      }
    ]


theSecurityMoves : List Move
theSecurityMoves =
    [ { type_ = BendBarsLiftGates
      , title = "Bend Bars, Lift Gates"
      , desc = contentBendBarsLiftGates
      , roll = [ RollStr ]
      , level = 1
      }
    , { type_ = Armored
      , title = "Armored"
      , desc = contentArmored
      , roll = []
      , level = 1
      }
    , { type_ = SignatureWeapon
      , title = "Signature Weapon"
      , desc = contentSignatureWeapon
      , roll = []
      , level = 1
      }
    , { type_ = Merciless
      , title = "Merciless"
      , desc = contentMerciless
      , roll = []
      , level = 2
      }
    , { type_ = Interrogator
      , title = "Interrogator"
      , desc = contentInterrogator
      , roll = []
      , level = 3
      }
    , { type_ = ArmorMastery
      , title = "Armor Mastery"
      , desc = contentArmorMastery
      , roll = []
      , level = 4
      }
    , { type_ = Heirloom
      , title = "Heirloom"
      , desc = contentHeirloom
      , roll = [ RollCha ]
      , level = 5
      }
    ]


theIntelligenceMoves : List Move
theIntelligenceMoves =
    [ { type_ = Professional
      , title = "Professional"
      , desc = contentProfessional
      , roll = []
      , level = 1
      }
    , { type_ = TrapExpert
      , title = "Trap Expert"
      , desc = contentTrapExpert
      , roll = [ RollDex ]
      , level = 1
      }
    , { type_ = TricksOfTheTrade
      , title = "Tricks of the Trade"
      , desc = contentTricksOfTheTrade
      , roll = [ RollDex ]
      , level = 1
      }
    , { type_ = Backstab
      , title = "Backstab"
      , desc = contentBackstab
      , roll = [ RollDex ]
      , level = 1
      }
    , { type_ = Poisoner
      , title = "Poisoner"
      , desc = contentPoisoner
      , roll = []
      , level = 1
      }
    , { type_ = Cautious
      , title = "Cautious"
      , desc = contentCautious
      , roll = []
      , level = 2
      }
    , { type_ = Connections
      , title = "Connections"
      , desc = contentConnections
      , roll = [ RollCha ]
      , level = 3
      }
    , { type_ = ShootFirst
      , title = "Shoot First"
      , desc = contentShootFirst
      , roll = []
      , level = 4
      }
    , { type_ = CheapShot
      , title = "Cheap Shot"
      , desc = contentCheapShot
      , roll = []
      , level = 5
      }
    ]


theCaptainSpellbookMoves : List Move
theCaptainSpellbookMoves =
    [ { type_ = SpellClericLight
      , title = "Light"
      , desc = contentSpellClericLight
      , roll = [ RollWis ]
      , level = 2
      }
    , { type_ = SpellClericSanctify
      , title = "Sanctify"
      , desc = contentSpellClericSanctify
      , roll = [ RollWis ]
      , level = 2
      }
    , { type_ = SpellClericGuidance
      , title = "Guidance"
      , desc = contentSpellClericGuidance
      , roll = [ RollWis ]
      , level = 2
      }
    , { type_ = SpellClericMagicWeapon
      , title = "Magic Weapon"
      , desc = contentSpellClericMagicWeapon
      , roll = [ RollWis ]
      , level = 2
      }
    , { type_ = SpellClericSanctuary
      , title = "Sanctuary"
      , desc = contentSpellClericSanctuary
      , roll = [ RollWis ]
      , level = 2
      }
    , { type_ = SpellClericSpeakWithDead
      , title = "Speak With Dead"
      , desc = contentSpellClericSpeakWithDead
      , roll = [ RollWis ]
      , level = 3
      }
    , { type_ = SpellClericCureModerateWounds
      , title = "Cure Moderate Wounds"
      , desc = contentSpellClericCureModerateWounds
      , roll = [ RollWis ]
      , level = 4
      }
    , { type_ = SpellClericHoldPerson
      , title = "Hold Person"
      , desc = contentSpellClericHoldPerson
      , roll = [ RollWis ]
      , level = 5
      }
    ]


theNavigatorSpellbookMoves : List Move
theNavigatorSpellbookMoves =
    [ { type_ = SpellClericLight
      , title = "Light"
      , desc = contentSpellClericLight
      , roll = [ RollWis ]
      , level = 2
      }
    , { type_ = SpellClericSanctify
      , title = "Sanctify"
      , desc = contentSpellClericSanctify
      , roll = [ RollWis ]
      , level = 2
      }
    , { type_ = SpellClericGuidance
      , title = "Guidance"
      , desc = contentSpellClericGuidance
      , roll = [ RollWis ]
      , level = 2
      }
    , { type_ = SpellClericCureLightWounds
      , title = "Cure Light Wounds"
      , desc = contentSpellClericCureLightWounds
      , roll = [ RollWis ]
      , level = 2
      }
    , { type_ = SpellClericCauseFear
      , title = "Cause Fear"
      , desc = contentSpellClericCauseFear
      , roll = [ RollWis ]
      , level = 2
      }
    , { type_ = SpellClericMagicWeapon
      , title = "Magic Weapon"
      , desc = contentSpellClericMagicWeapon
      , roll = [ RollWis ]
      , level = 3
      }
    , { type_ = SpellClericAnimateDead
      , title = "Animate Dead"
      , desc = contentSpellClericAnimateDead
      , roll = [ RollWis ]
      , level = 4
      }
    , { type_ = SpellClericDarkness
      , title = "Darkness"
      , desc = contentSpellClericDarkness
      , roll = [ RollWis ]
      , level = 5
      }
    ]


theBiomechanicSpellbookMoves : List Move
theBiomechanicSpellbookMoves =
    [ { type_ = SpellClericLight
      , title = "Light"
      , desc = contentSpellClericLight
      , roll = [ RollWis ]
      , level = 0
      }
    , { type_ = SpellClericSanctify
      , title = "Sanctify"
      , desc = contentSpellClericSanctify
      , roll = [ RollWis ]
      , level = 0
      }
    , { type_ = SpellClericGuidance
      , title = "Guidance"
      , desc = contentSpellClericGuidance
      , roll = [ RollWis ]
      , level = 0
      }
    , { type_ = SpellClericCureLightWounds
      , title = "Cure Light Wounds"
      , desc = contentSpellClericCureLightWounds
      , roll = [ RollWis ]
      , level = 1
      }
    , { type_ = SpellClericSpeakWithDead
      , title = "Speak With Dead"
      , desc = contentSpellClericSpeakWithDead
      , roll = [ RollWis ]
      , level = 1
      }
    , { type_ = SpellClericBless
      , title = "Bless"
      , desc = contentSpellClericBless
      , roll = [ RollWis ]
      , level = 2
      }
    , { type_ = SpellClericRes
      , title = "Res"
      , desc = contentSpellClericRes
      , roll = [ RollWis ]
      , level = 3
      }
    , { type_ = SpellClericCureModerateWounds
      , title = "Cure Moderate Wounds"
      , desc = contentSpellClericCureModerateWounds
      , roll = [ RollWis ]
      , level = 4
      }
    , { type_ = SpellClericTrueSeeing
      , title = "True Seeing"
      , desc = contentSpellClericTrueSeeing
      , roll = [ RollWis ]
      , level = 5
      }
    ]


theBiomechanicMoves : List Move
theBiomechanicMoves =
    [ { type_ = Deity
      , title = "Deity"
      , desc = contentDeity
      , roll = []
      , level = 1
      }
    , { type_ = DivineGuidance
      , title = "Divine Guidance"
      , desc = contentDivineGuidance
      , roll = []
      , level = 1
      }
    , { type_ = TurnUndead
      , title = "Turn Undead"
      , desc = contentTurnUndead
      , roll = [ RollWis ]
      , level = 1
      }
    , { type_ = ClericCastSpell
      , title = "Cast Spell"
      , desc = contentClericCastSpell
      , roll = []
      , level = 1
      }
    , { type_ = Serenity
      , title = "Serenity"
      , desc = contentSerenity
      , roll = []
      , level = 2
      }
    , { type_ = DivineIntervention
      , title = "Divine Intervention"
      , desc = contentDivineIntervention
      , roll = []
      , level = 3
      }
    , { type_ = DevotedHealer
      , title = "Devoted Healer"
      , desc = contentDevotedHealer
      , roll = [ RollWis ]
      , level = 4
      }
    , { type_ = OrisonForGuidance
      , title = "Orison For Guidance"
      , desc = contentOrisonForGuidance
      , roll = [ RollWis ]
      , level = 5
      }
    ]


theScientistMoves : List Move
theScientistMoves =
    [ { type_ = HercApp
      , title = "Herculean Appetites"
      , desc = contentHercApp
      , roll = []
      , level = 1
      }
    , { type_ = TheUpperHand
      , title = "The Upper Hand"
      , desc = contentTheUpperHand
      , roll = []
      , level = 1
      }
    , { type_ = Musclebound
      , title = "Musclebound"
      , desc = contentMusclebound
      , roll = []
      , level = 1
      }
    , { type_ = WhatAreYouWaitingFor
      , title = "What Are You Waiting For?"
      , desc = contentWhatAreYouWaitingFor
      , roll = [ RollCon ]
      , level = 1
      }
    , { type_ = FullPlatePackingSteel
      , title = "Full Plate and Packing Steel"
      , desc = contentFullPlatePackingSteel
      , roll = []
      , level = 1
      }
    , { type_ = WideWanderer
      , title = "Wide-Wanderer"
      , desc = contentWideWanderer
      , roll = []
      , level = 2
      }
    , { type_ = Samson
      , title = "Samson"
      , desc = contentSamson
      , roll = []
      , level = 3
      }
    , { type_ = Smash
      , title = "Smash"
      , desc = contentSmash
      , roll = []
      , level = 4
      }
    , { type_ = EyeForWeakness
      , title = "EyeForWeakness"
      , desc = contentEyeForWeakness
      , roll = []
      , level = 5
      }
    ]


theNavigatorMoves : List Move
theNavigatorMoves =
    [ { type_ = HuntAndTrack
      , title = "Hunt And Track"
      , desc = contentHuntAndTrack
      , roll = [ RollWis ]
      , level = 1
      }
    , { type_ = CalledShot
      , title = "Called Shot"
      , desc = contentCalledShot
      , roll = [ RollDex ]
      , level = 1
      }
    , { type_ = AnimalCompanion
      , title = "Animal Companion"
      , desc = contentAnimalCompanion
      , roll = []
      , level = 1
      }
    , { type_ = GodAmidstTheWastes
      , title = "God Amidst the Wastes"
      , desc = contentGodAmidstTheWastes
      , roll = []
      , level = 2
      }
    , { type_ = FamiliarPrey
      , title = "Familiar Prey"
      , desc = contentFamiliarPrey
      , roll = []
      , level = 3
      }
    , { type_ = WildEmpathy
      , title = "Wild Empathy"
      , desc = contentWildEmpathy
      , roll = []
      , level = 4
      }
    , { type_ = BlotOutTheSun
      , title = "Blot Out The Sun"
      , desc = contentBlotOutTheSun
      , roll = []
      , level = 5
      }
    ]


theEngineerMoves : List Move
theEngineerMoves =
    [ { type_ = BornOfTheSoil
      , title = "Born of the Soil"
      , desc = contentBornOfTheSoil
      , roll = []
      , level = 1
      }
    , { type_ = ByNatureSustained
      , title = "By Nature Sustained"
      , desc = contentByNatureSustained
      , roll = []
      , level = 1
      }
    , { type_ = SpiritTongue
      , title = "Spirit Tongue"
      , desc = contentSpiritTongue
      , roll = []
      , level = 1
      }
    , { type_ = Shapeshifter
      , title = "Shapeshifter"
      , desc = contentShapeshifter
      , roll = [ RollWis ]
      , level = 1
      }
    , { type_ = StudiedEssence
      , title = "Studied Essence"
      , desc = contentStudiedEssence
      , roll = []
      , level = 1
      }
    , { type_ = ThingTalker
      , title = "Thing-Talker"
      , desc = contentThingTalker
      , roll = []
      , level = 2
      }
    , { type_ = CommunionOfWhispers
      , title = "Communion of Whispers"
      , desc = contentCommunionOfWhispers
      , roll = []
      , level = 3
      }
    , { type_ = RedOfToothAndClaw
      , title = "Red of Tooth and Claw"
      , desc = contentRedOfToothAndClaw
      , roll = []
      , level = 4
      }
    , { type_ = ElementalMastery
      , title = "Elemental Mastery"
      , desc = contentElementalMastery
      , roll = []
      , level = 5
      }
    ]


thePilotMoves : List Move
thePilotMoves =
    [ { type_ = WizardCastSpell
      , title = "Cast a Spell"
      , desc = contentWizardCastSpell
      , roll = []
      , level = 1
      }
    , { type_ = SpellDefense
      , title = "Spell Defense"
      , desc = contentSpellDefense
      , roll = []
      , level = 1
      }
    , { type_ = Ritual
      , title = "Ritual"
      , desc = contentRitual
      , roll = []
      , level = 1
      }
    , { type_ = Logical
      , title = "Logical"
      , desc = contentLogical
      , roll = []
      , level = 2
      }
    , { type_ = FountOfKnowledge
      , title = "Fount of Knowledge"
      , desc = contentFountOfKnowledge
      , roll = []
      , level = 3
      }
    , { type_ = Counterspell
      , title = "Counterspell"
      , desc = contentCounterspell
      , roll = [ RollInt ]
      , level = 4
      }
    , { type_ = QuickStudy
      , title = "Quick Study"
      , desc = contentQuickStudy
      , roll = []
      , level = 5
      }
    ]


theFirstMateSpellbookMoves : List Move
theFirstMateSpellbookMoves =
    [ { type_ = SpellWizardLight
      , title = "Light"
      , desc = contentSpellWizardLight
      , roll = [ RollInt ]
      , level = 2
      }
    , { type_ = SpellWizardUnseenServant
      , title = "Unseen Servant"
      , desc = contentSpellWizardUnseenServant
      , roll = [ RollInt ]
      , level = 2
      }
    , { type_ = SpellWizardPrestidigitation
      , title = "Prestidigitation"
      , desc = contentSpellWizardPrestidigitation
      , roll = [ RollInt ]
      , level = 2
      }
    , { type_ = SpellWizardMagicMissile
      , title = "Magic Missile"
      , desc = contentSpellWizardAlarm
      , roll = [ RollInt ]
      , level = 2
      }
    , { type_ = SpellWizardInvisibility
      , title = "Invisibility"
      , desc = contentSpellWizardInvisibility
      , roll = [ RollInt ]
      , level = 2
      }
    , { type_ = SpellWizardDetectMagic
      , title = "Detect Magic"
      , desc = contentSpellWizardDetectMagic
      , roll = [ RollInt ]
      , level = 3
      }
    , { type_ = SpellWizardDispelMagic
      , title = "Dispel Magic"
      , desc = contentSpellWizardDispelMagic
      , roll = [ RollInt ]
      , level = 4
      }
    , { type_ = SpellWizardFireball
      , title = "Fireball"
      , desc = contentSpellWizardFireball
      , roll = [ RollInt ]
      , level = 5
      }
    ]


thePilotSpellbookMoves : List Move
thePilotSpellbookMoves =
    [ { type_ = SpellWizardLight
      , title = "Light"
      , desc = contentSpellWizardLight
      , roll = [ RollInt ]
      , level = 0
      }
    , { type_ = SpellWizardUnseenServant
      , title = "Unseen Servant"
      , desc = contentSpellWizardUnseenServant
      , roll = [ RollInt ]
      , level = 0
      }
    , { type_ = SpellWizardPrestidigitation
      , title = "Prestidigitation"
      , desc = contentSpellWizardPrestidigitation
      , roll = [ RollInt ]
      , level = 0
      }
    , { type_ = SpellWizardContactSpirits
      , title = "Contact Spirits"
      , desc = contentSpellWizardContactSpirits
      , roll = [ RollInt ]
      , level = 1
      }
    , { type_ = SpellWizardMagicMissile
      , title = "Magic Missile"
      , desc = contentSpellWizardMagicMissile
      , roll = [ RollInt ]
      , level = 1
      }
    , { type_ = SpellWizardAlarm
      , title = "Alarm"
      , desc = contentSpellWizardAlarm
      , roll = [ RollInt ]
      , level = 2
      }
    , { type_ = SpellWizardSleep
      , title = "Sleep"
      , desc = contentSpellWizardSleep
      , roll = [ RollInt ]
      , level = 3
      }
    , { type_ = SpellWizardFireball
      , title = "Fireball"
      , desc = contentSpellWizardFireball
      , roll = [ RollInt ]
      , level = 4
      }
    , { type_ = SpellWizardPolymorph
      , title = "Polymorph"
      , desc = contentSpellWizardPolymorph
      , roll = [ RollInt ]
      , level = 5
      }
    ]


theSmugglerMoves : List Move
theSmugglerMoves =
    [ { type_ = WizardCastSpell
      , title = "Cast a Spell"
      , desc = contentWizardCastSpell
      , roll = []
      , level = 1
      }
    , { type_ = SpellDefense
      , title = "Spell Defense"
      , desc = contentSpellDefense
      , roll = []
      , level = 1
      }
    , { type_ = Ritual
      , title = "Ritual"
      , desc = contentRitual
      , roll = []
      , level = 1
      }
    ]


theSmugglerSpellbookMoves : List Move
theSmugglerSpellbookMoves =
    [ { type_ = SpellWizardLight
      , title = "Light"
      , desc = contentSpellWizardLight
      , roll = [ RollInt ]
      , level = 0
      }
    , { type_ = SpellWizardUnseenServant
      , title = "Unseen Servant"
      , desc = contentSpellWizardUnseenServant
      , roll = [ RollInt ]
      , level = 0
      }
    , { type_ = SpellWizardPrestidigitation
      , title = "Prestidigitation"
      , desc = contentSpellWizardPrestidigitation
      , roll = [ RollInt ]
      , level = 0
      }
    , { type_ = SpellWizardDetectMagic
      , title = "Detect Magic"
      , desc = contentSpellWizardDetectMagic
      , roll = [ RollInt ]
      , level = 0
      }
    , { type_ = SpellWizardCharmPerson
      , title = "Charm Person"
      , desc = contentSpellWizardCharmPerson
      , roll = [ RollInt ]
      , level = 1
      }
    , { type_ = SpellWizardInvisibility
      , title = "Invisibility"
      , desc = contentSpellWizardInvisibility
      , roll = [ RollInt ]
      , level = 1
      }
    ]



-- SECTION: UTILS


hp : Model -> Character -> Int
hp model character =
    List.sum
        (List.map (\_ -> 1) <|
            List.filter (\increaseStatName -> increaseStatName == "con") <|
                List.take (model.level - 1) character.statIncreases
        )
        + character.con
        + character.baseHP


extractMoveType : Character -> Move -> MoveType
extractMoveType character move =
    move.type_


getMoveTypes : Model -> Character -> List MoveType
getMoveTypes model character =
    List.map
        (extractMoveType character)
        (List.concatMap
            (\moveSet ->
                filterLevelMoves model moveSet
            )
            character.moves
        )


filterLevelMoves : Model -> MoveSet -> List Move
filterLevelMoves model moveSet =
    List.filter (\m -> model.level >= m.level) moveSet.moves


modFromStat : Int -> Maybe Int
modFromStat stat =
    case stat of
        18 ->
            Just 3

        17 ->
            Just 2

        16 ->
            Just 2

        15 ->
            Just 1

        14 ->
            Just 1

        13 ->
            Just 1

        12 ->
            Just 0

        11 ->
            Just 0

        10 ->
            Just 0

        9 ->
            Just 0

        8 ->
            Just -1

        7 ->
            Just -1

        6 ->
            Just -1

        5 ->
            Just -2

        4 ->
            Just -2

        3 ->
            Just -3

        2 ->
            Just -3

        1 ->
            Just -3

        _ ->
            Nothing


displayModFromStat : Int -> String
displayModFromStat stat =
    case modFromStat stat of
        Just mod ->
            case mod > 0 of
                True ->
                    "+" ++ toString mod

                False ->
                    toString mod

        Nothing ->
            "error: mod from stat not calculated"


levelStringToLevel : String -> Int
levelStringToLevel s =
    case s of
        "Level 1" ->
            1

        "Level 2" ->
            2

        "Level 3" ->
            3

        "Level 4" ->
            4

        "Level 5" ->
            5

        _ ->
            0


playerToCharacterType : String -> CharacterType
playerToCharacterType s =
    case s of
        "The Director - GM" ->
            TheDirector

        "The Captain - Paladin" ->
            TheCaptain

        "The First Mate - Bard" ->
            TheFirstMate

        "The Security Officer - Fighter" ->
            TheSecurity

        "The Intelligence Officer - Thief" ->
            TheIntelligence

        "The Pilot - Wizard" ->
            ThePilot

        "The Biomechanic - Cleric" ->
            TheBiomechanic

        "The Engineer - Druid" ->
            TheEngineer

        "The Scientist - Barbarian" ->
            TheScientist

        "The Navigation Officer - Ranger" ->
            TheNavigator

        "Select Character" ->
            SelectCharacter

        _ ->
            CharacterTypeError


isActiveScreenType : Model -> ScreenType -> String
isActiveScreenType model screenType =
    if screenType == model.screenType then
        " " ++ "active"
    else
        ""


isActiveCharacter : Model -> CharacterType -> String
isActiveCharacter model characterType =
    if characterType == model.characterType then
        " " ++ "active"
    else
        ""


maybeGetCharacter : CharacterType -> Maybe Character
maybeGetCharacter type_ =
    List.head (List.filter (\char -> char.type_ == type_) characters)


addLevelMods : Model -> Character -> String -> Int
addLevelMods model character statName =
    List.sum
        (List.map (\_ -> 1) <|
            List.filter (\increaseStatName -> increaseStatName == statName) <|
                List.take (model.level - 1) character.statIncreases
        )
        + (case statName of
            "str" ->
                character.str

            "dex" ->
                character.dex

            "con" ->
                character.con

            "int" ->
                character.int

            "wis" ->
                character.wis

            "cha" ->
                character.cha

            _ ->
                --TODO something less extra
                9000
          )


viewHeader : Model -> Html Msg
viewHeader model =
    nav [ class "navbar navbar-expand-lg navbar-dark bg-primary" ]
        [ span [ class "navbar-brand" ] [ text "Dī Penātēs v0.4.0" ]
        , select
            [ onInput ChangeCharacter
            , class
                "custom-select custom-select-lg"
            ]
            [ option [] [ text "Select Character" ]
            , option [] [ text "The Captain - Paladin" ]
            , option [] [ text "The First Mate - Bard" ]
            , option [] [ text "The Security Officer - Fighter" ]
            , option [] [ text "The Intelligence Officer - Thief" ]
            , option [] [ text "The Navigation Officer - Ranger" ]
            , option [] [ text "The Engineer - Druid" ]
            , option [] [ text "The Pilot - Wizard" ]
            , option [] [ text "The Biomechanic - Cleric" ]
            , option [] [ text "The Scientist - Barbarian" ]
            , option [] [ text "The Director - GM" ]
            ]
        , select
            [ onInput ChangeLevel
            , class
                "custom-select custom-select-lg"
            ]
            [ option [] [ text "Level 1" ]
            , option [] [ text "Level 2" ]
            , option [] [ text "Level 3" ]
            , option [] [ text "Level 4" ]
            , option [] [ text "Level 5" ]
            ]
        ]


viewFooter : Html Msg
viewFooter =
    div [ class "card" ]
        [ div [ class "card-body" ]
            [ h5 [ class "card-title" ] [ text "Dī Penātēs Solar Crawler" ]
            , p []
                [ text "A Freeform LARP"
                , br [] []
                , text "A SciFi Mod of Dungeon World"
                ]
            ]
        ]


viewContent : Model -> Html Msg
viewContent model =
    div []
        [ div [ class "row" ]
            [ div [ class "col-md" ]
                [ viewCharacterName model
                , viewMenu model
                , br [] []
                , case model.screenType of
                    ViewCharacters ->
                        viewCharacters model

                    MakeMove ->
                        viewMakeMove model

                    CharacterSheet ->
                        viewCharacterSheet model

                    Inventory ->
                        viewInventory model

                    CharacterChoices ->
                        viewCharacterChoices model

                    Prep ->
                        viewPrep model

                    ScreenTypeError ->
                        div [] [ text "Error: not a valid screen type" ]
                , br [] []
                ]
            , div [ class "col-md" ]
                [ Markdown.toHtml [] contentSidePanel
                ]
            ]
        ]


viewTwoButtons : String -> Msg -> String -> Msg -> Html Msg
viewTwoButtons button1 onClickButton1 button2 onClickButton2 =
    --TODO
    div [] []


viewCharacterChoices : Model -> Html Msg
viewCharacterChoices model =
    --TODO
    div [] [ text "TODO" ]


viewPrep : Model -> Html Msg
viewPrep model =
    div [] [ Markdown.toHtml [] contentPrepHidden ]


viewInventory : Model -> Html Msg
viewInventory model =
    --TODO
    div [] [ text "TODO" ]


viewCharacterSheet : Model -> Html Msg
viewCharacterSheet model =
    div []
        [ case model.characterType of
            SelectCharacter ->
                p [] [ text "Select Player (above)" ]

            CharacterTypeError ->
                p [] [ text "Error selecting player" ]

            TheDirector ->
                Markdown.toHtml [] contentFronts

            characterType ->
                let
                    maybeCharacter =
                        maybeGetCharacter characterType
                in
                case maybeCharacter of
                    Nothing ->
                        p [] [ text "Error character not in characters list" ]

                    Just character ->
                        div []
                            [ p [] [ text character.name ]
                            , p [] [ b [] [ text "HP: " ], text <| toString <| hp model character ]
                            , ul [ class "list-unstyled" ]
                                [ li [] [ b [] [ text "Str: " ], viewStat model character "str" ]
                                , li [] [ b [] [ text "Dex: " ], viewStat model character "dex" ]
                                , li [] [ b [] [ text "Con: " ], viewStat model character "con" ]
                                , li [] [ b [] [ text "Int: " ], viewStat model character "int" ]
                                , li [] [ b [] [ text "Wis: " ], viewStat model character "wis" ]
                                , li [] [ b [] [ text "Cha: " ], viewStat model character "cha" ]
                                ]
                            , Markdown.toHtml [] character.desc
                            , case model.level of
                                3 ->
                                    Markdown.toHtml [] character.twist

                                5 ->
                                    Markdown.toHtml [] character.finale

                                _ ->
                                    text ""
                            ]
        ]


viewStat : Model -> Character -> String -> Html Msg
viewStat model character statName =
    let
        stat =
            addLevelMods model character statName
    in
    text
        (toString stat
            ++ " ("
            ++ (case modFromStat stat of
                    Nothing ->
                        "error out of 1-18 bounds"

                    Just mod ->
                        case mod > 0 of
                            True ->
                                "+" ++ toString mod

                            False ->
                                toString mod
               )
            ++ ")"
        )


viewStatMod : Model -> Maybe Character -> String -> Html Msg
viewStatMod model maybeCharacter statName =
    let
        stat =
            case maybeCharacter of
                Just character ->
                    addLevelMods model character statName

                Nothing ->
                    --TODO less cute
                    9000
    in
    text
        ("("
            ++ (case modFromStat stat of
                    Nothing ->
                        "error out of 1-18 bounds"

                    Just mod ->
                        case mod > 0 of
                            True ->
                                "+" ++ toString mod

                            False ->
                                toString mod
               )
            ++ ")"
        )


viewCharacterName : Model -> Html Msg
viewCharacterName model =
    div []
        [ case model.characterType of
            SelectCharacter ->
                h1 [] [ text "Select Player (above)" ]

            CharacterTypeError ->
                h1 [] [ text "Error selecting player" ]

            TheDirector ->
                h1 [] [ text "The Director" ]

            _ ->
                h1 []
                    (List.map
                        (\char ->
                            if char.type_ == model.characterType then
                                text char.name
                            else
                                text ""
                        )
                        characters
                    )
        ]


viewMove : Model -> MoveSet -> Move -> Html Msg
viewMove model moveSet move =
    div [ class "card", id (moveTypeToString move.type_ ++ "Overarching") ]
        [ div [ id ("heading" ++ moveTypeToString move.type_) ]
            [ div [ class "list-group list-group-flush" ]
                [ h5 []
                    [ button
                        [ class "list-group-item list-group-item-action collapsed"
                        , type_ "button"
                        , attribute "data-toggle" "collapse"
                        , attribute "data-target" ("#" ++ "collapse" ++ moveTypeToString move.type_)
                        , attribute "aria-expanded" "false"
                        , attribute "aria-controls" ("collapse" ++ moveTypeToString move.type_)
                        , onClick ResetRoll
                        ]
                        [ text move.title ]
                    ]
                ]
            ]
        , div
            [ class "collapse"
            , id ("collapse" ++ moveTypeToString move.type_)
            , attribute "role" "dialog"
            , attribute "aria-labelledby" ("heading" ++ moveTypeToString move.type_)
            , attribute "data-parent" ("#accordion" ++ moveSet.id)
            ]
            [ div [ class "card-body" ]
                [ Markdown.toHtml [] move.desc
                , viewMoveControls model moveSet move
                ]
            ]
        ]


rollResult : Model -> RollType -> String
rollResult model rollType =
    let
        maybeCharacter =
            maybeGetCharacter model.characterType

        maybeStatMod =
            case maybeCharacter of
                Just character ->
                    case rollType of
                        RollReason reason roll ->
                            getStatMod character roll

                        _ ->
                            getStatMod character rollType

                Nothing ->
                    Nothing

        ( rollOne, rollTwo ) =
            rollAbilityDice model.seed
    in
    (case maybeStatMod of
        Nothing ->
            toString (rollOne + rollTwo)

        Just statMod ->
            toString (rollOne + rollTwo + statMod)
    )
        ++ " = "
        ++ toString rollOne
        ++ "+"
        ++ toString rollTwo
        ++ "+"
        ++ (case maybeStatMod of
                Nothing ->
                    "0"

                Just statMod ->
                    toString statMod
           )


rollAbilityDice : Seed -> ( Int, Int )
rollAbilityDice seed =
    let
        ( _, newSeed ) =
            Random.step (Random.int 1 6) seed

        ( resultOne, newSeedTwo ) =
            Random.step (Random.int 1 6) newSeed

        ( resultTwo, _ ) =
            Random.step (Random.int 1 6) newSeedTwo
    in
    ( resultOne, resultTwo )


getStatMod : Character -> RollType -> Maybe Int
getStatMod character rollType =
    case rollType of
        RollFour ->
            Nothing

        RollSix ->
            Nothing

        RollEight ->
            Nothing

        RollTen ->
            Nothing

        RollTwelve ->
            Nothing

        RollStr ->
            modFromStat character.str

        RollDex ->
            modFromStat character.dex

        RollInt ->
            modFromStat character.int

        RollCon ->
            modFromStat character.con

        RollCha ->
            modFromStat character.cha

        RollWis ->
            modFromStat character.wis

        RollReason _ _ ->
            Nothing


viewRollType : Model -> RollType -> Html Msg
viewRollType model rollType =
    button
        [ class "list-group-item list-group-item-action"
        , onClick (Roll rollType)
        ]
        [ case rollType of
            RollReason reason roll ->
                div []
                    [ i [] [ text reason ]
                    , viewRoll model roll
                    ]

            roll ->
                viewRoll model roll
        ]


viewRoll : Model -> RollType -> Html Msg
viewRoll model roll =
    let
        maybeCharacter =
            maybeGetCharacter model.characterType
    in
    case roll of
        RollFour ->
            text "Roll d4"

        RollSix ->
            text "Roll d6"

        RollEight ->
            text "Roll d8"

        RollTen ->
            text "Roll d10"

        RollTwelve ->
            text "Roll d12"

        RollStr ->
            div []
                [ text "Roll STR"
                , text " "
                , viewStatMod model maybeCharacter "str"
                ]

        RollCon ->
            div []
                [ text "Roll CON"
                , text " "
                , viewStatMod model maybeCharacter "con"
                ]

        RollDex ->
            div []
                [ text "Roll DEX"
                , text " "
                , viewStatMod model maybeCharacter "dex"
                ]

        RollInt ->
            div []
                [ text "Roll INT"
                , text " "
                , viewStatMod model maybeCharacter "int"
                ]

        RollWis ->
            div []
                [ text "Roll WIS"
                , text " "
                , viewStatMod model maybeCharacter "wis"
                ]

        RollCha ->
            div []
                [ text "Roll CHA"
                , text " "
                , viewStatMod model maybeCharacter "cha"
                ]

        _ ->
            text "Not implemented"


viewMoveControls : Model -> MoveSet -> Move -> Html Msg
viewMoveControls model moveSet move =
    case move.roll of
        [] ->
            div [] []

        [ roll ] ->
            div []
                [ p [] [ text model.roll ]
                , viewRollType model roll
                ]

        rolls ->
            div []
                ([ p [] [ text model.roll ] ]
                    ++ List.map
                        (viewRollType model)
                        rolls
                )


viewMoveSet : Model -> MoveSet -> Html Msg
viewMoveSet model moveSet =
    let
        moves =
            List.filter (\m -> model.level >= m.level) moveSet.moves
    in
    if moves /= [] then
        div []
            [ h4 [] [ text moveSet.title ]
            , div [ class "accordion", id ("accordion" ++ moveSet.id) ]
                (List.map
                    (viewMove model moveSet)
                    moves
                )
            , br [] []
            ]
    else
        div [] []


viewMakeMove : Model -> Html Msg
viewMakeMove model =
    div []
        [ case model.characterType of
            SelectCharacter ->
                text "Select Player (above)"

            CharacterTypeError ->
                text "Error selecting player"

            TheDirector ->
                div []
                    (List.map
                        (viewMoveSet model)
                        theDirectorMoves
                    )

            _ ->
                viewMoves model
        ]


viewMoves : Model -> Html Msg
viewMoves model =
    div []
        (List.map
            (\char ->
                if char.type_ == model.characterType then
                    div []
                        (List.map
                            (viewMoveSet model)
                            char.moves
                        )
                else
                    text ""
            )
            characters
        )


viewMenu : Model -> Html Msg
viewMenu model =
    div [ class "list-group" ]
        [ button
            [ class ("list-group-item list-group-item-action" ++ isActiveScreenType model MakeMove)
            , onClick (ChangeScreenType MakeMove)
            ]
            [ h5 [] [ text "Perform Action" ] ]
        , button
            [ class ("list-group-item list-group-item-action" ++ isActiveScreenType model CharacterSheet)
            , onClick (ChangeScreenType CharacterSheet)
            ]
            [ h5 [] [ text "Character Sheet" ] ]
        , button
            [ class ("list-group-item list-group-item-action" ++ isActiveScreenType model ViewCharacters)
            , onClick (ChangeScreenType ViewCharacters)
            ]
            [ h5 [] [ text "View Characters" ] ]
        ]


viewCharacters : Model -> Html Msg
viewCharacters model =
    div []
        [ ul [ class "list-group" ]
            (List.map
                (\x ->
                    viewCharacter model x
                )
                characters
            )
        ]


viewCharacter : Model -> Character -> Html Msg
viewCharacter model character =
    li
        [ class "list-group-item" ]
        [ h5 [] [ text character.name ]
        , p [] [ b [] [ text "HP: " ], text <| toString <| hp model character ]
        , ul [ class "list-unstyled" ]
            [ li [] [ b [] [ text "Str: " ], viewStat model character "str" ]
            , li [] [ b [] [ text "Dex: " ], viewStat model character "dex" ]
            , li [] [ b [] [ text "Con: " ], viewStat model character "con" ]
            , li [] [ b [] [ text "Int: " ], viewStat model character "int" ]
            , li [] [ b [] [ text "Wis: " ], viewStat model character "wis" ]
            , li [] [ b [] [ text "Cha: " ], viewStat model character "cha" ]
            ]
        , small [] [ text ("Based on " ++ character.origin) ]
        ]


type Msg
    = Noop
    | ChangeCharacter String
    | ChangeScreenType ScreenType
    | ChangeLevel String
    | SetSeed Time.Posix
    | Roll RollType
    | ResetRoll


setSeed : Model -> Time.Posix -> ( Model, Cmd Msg )
setSeed model currentTime =
    let
        seed0 =
            Random.initialSeed <| Time.posixToMillis currentTime
    in
    ( { model
        | seed = seed0
      }
    , Cmd.none
    )


contentArcaneArt =
    """
When you weave a performance into a basic spell, choose an ally and an effect:

* Heal 1d8 damage
* +1d4 forward to damage
* Their mind is shaken clear of one enchantment
* The next time someone successfully assists the target with aid, they get +2 instead of +1

Then roll+Cha.

* On a 10+, the ally gets the selected effect.

* On a 7-9, your spell still works, but you draw unwanted attention or your
magic reverberates to other targets affecting them as well, GM’s choice.
    """


contentChangeEnvironment =
    """
The environment is the general feel of the area the players are in: carved
tunnels, warped trees, safe trails, or whatever else. This is your opportunity
to introduce them to a new environment: the tunnels gradually become naturally
carved, the trees are dead and strange, or the trails are lost and the
wilderness takes over. Use this move to vary the types of areas and creatures
the players will face.
"""


contentDealDamage =
    """
When you deal damage, choose one source of damage that’s fictionally threatening a character and apply it. In combat with a lizard man? It stabs you. Triggered a trap? Rocks fall on you.

The amount of damage is decided by the source. In some cases, this move might involve trading damage both ways, with the character also dealing damage.

Most damage is based on a die roll. When a player takes damage, tell them what to roll. You never need to touch the dice. If the player is too cowardly to find out their own fate, they can ask another player to roll for them.
              """


contentDefyDanger =
    """
When you act despite an imminent threat or suffer a calamity, say how you deal
with it and roll. If you do it:

* by powering through, +Str
* by getting out of the way or acting fast, +Dex
* by enduring, +Con
* with quick thinking, +Int
* through mental fortitude, +Wis
* using charm and social grace, +Cha

On a 10+, you do what you set out to, the threat doesn’t come to bear. On
a 7–9, you stumble, hesitate, or flinch: the GM will offer you a worse outcome,
hard bargain, or ugly choice.
"""


contentIntroduceNewFaction =
    """
A type of creature is a broad grouping: orcs, goblins, lizardmen, the undead, etc.

A faction is a group of creatures united by a similar goal. Once you introduce them you can begin to make moves and cause trouble for the players with those creatures or NPCs.

Introducing means giving some clear sensory evidence or substantiated information. Don’t be coy; the players should have some idea what you’re showing the presence of. You can, however, be subtle in your approach. No need to have the cultist overlord waving a placard and screaming in the infernal tongue every single time.

A hard application of this move will snowball directly into a combat scene or ambush.
              """


contentLoreExpert =
    """
Choose an area of expertise:

* Spells and Magicks
* The Dead and Undead
* Grand Histories of the Known World
* A Bestiary of Creatures Unusual
* The Planar Spheres
* Legends of Heroes Past
* Gods and Their Servants

The Director will then convert this area into the world of the Solar Crawler,
and give you a rough overview of your knowledge.

When you first encounter an important creature, location, or item (your call)
covered by your lore expertise you can ask the GM any one question about it; the GM
will answer truthfully. The GM may then ask you what tale, song, or legend you
heard that information in.
      """


contentRitual =
    """
When you draw on a place of power to create a magical effect, tell the GM what you’re trying to achieve. Ritual effects are always possible, but the GM will give you one to four of the following conditions:

* It’s going to take days/weeks/months.
* First you must _________.
* You’ll need help from ________.
* It will require a lot of money
* The best you can do is a lesser version, unreliable and limited
* You and your allies will risk danger from _____________.
* You’ll have to disenchant ____________ to do it.
  """


contentSolarCrawler =
    """
## Dī Penātēs Solar Crawler

Humans, or what have become of humans after the exodus from climate-ravaged
Earth, began to learn to think in longer timelines, as the centuries inched
past, and Martian terraforming colonies, Venusian cloud cities, and Ceresian
mining operations took root.

This was in part because lifespan was so theoretically expandable, yet so
fragile.

Cyborgs need to sync their sense of time and perspective to communicate with
each other. Something in their mechanics, and their networked spread past the
limits of body, unmoored the cyborg from time.

This allows cyborgs a fast-forward button on their life. To dissociate


### The 26th C Solar System

A previous generation of cyborgs built a Space Elevator on Earth, now known as
Terra, the planet blanketed by resource-stripping drones. Resources sent up the
Elevator were processed at Luna, as the Moon was now known, and transported
off-world, sometimes to Venusian cloud cities, sometimes to Martian terraforming
communities.


"""


contentSpellDefense =
    """
You may end any ongoing spell immediately and use the energy of its dissipation
to deflect an oncoming attack. The spell ends and you subtract its level from
the damage done to you.
  """


contentSpellWizardCharmPerson =
    """
The person (not beast or monster) you touch while casting this spell counts you
as a friend until they take damage or you prove otherwise.
"""


contentSpellWizardDetectMagic =
    """
One of your senses is briefly attuned to magic. The GM will tell you what here
is magical.
"""


contentSpellWizardInvisibility =
    """
Touch an ally: nobody can see them. They’re invisible! The spell persists until
the target attacks or you dismiss the effect. While the spell is ongoing you
can’t cast a spell.
"""


contentSpellWizardLight =
    """
An item you touch glows with arcane light, about as bright as a torch. It gives
off no heat or sound and requires no fuel, but it is otherwise like a mundane
torch. You have complete control of the color of the flame. The spell lasts as
long as it is in your presence.
"""


contentSpellWizardPrestidigitation =
    """
You perform minor tricks of true magic. If you touch an item as part of the
casting you can make cosmetic changes to it: clean it, soil it, cool it, warm
it, flavor it, or change its color. If you cast the spell without touching an
item you can instead create minor illusions no bigger than yourself.
Prestidigitation illusions are crude and clearly illusions—they won’t fool
anyone, but they might entertain them.
"""


contentSpellWizardUnseenServant =
    """
You conjure a simple invisible construct that can do nothing but carry items. It
has Load 3 and carries anything you hand to it. It cannot pick up items on its
own and can only carry those you give to it. Items carried by an unseen servant
appear to float in the air a few paces behind you. An unseen servant that takes
damage or leaves your presence is immediately dispelled, dropping any items it
carried. Otherwise the unseen servant serves you until you end the spell.
"""


contentWizardCastSpell =
    """
When you release a spell you’ve prepared, roll+Int.

* On a 10+, the spell is successfully cast and you do not forget the spell—you
may cast it again later.

* On a 7-9, the spell is cast, but choose one:

  * You draw unwelcome attention or put yourself in a spot. The GM will tell you
    how.
  * The spell disturbs the fabric of reality as it is cast—take -1 ongoing
    to cast a spell until the next time you Prepare Spells.
  * After it is cast, the spell is forgotten. You cannot cast the spell
    again until you prepare spells.

Note that maintaining spells with ongoing effects will sometimes cause a penalty
to your roll to cast a spell.
"""


contentBornOfTheSoil =
    """
You learned your magic in a place whose spirits are strong and ancient and
they’ve marked you as one of their own. No matter where you go, they live
within you and allow you to take their shape. Choose one of the following. It
is the land to which you are attuned—when shapeshifting you may take the shape
of any animal who might live in your Land.

* The Great Forests
* The Whispering Plains
* The Vast Desert
* The Stinking Mire
* The River Delta
* The Depths of the Earth
* The Sapphire Islands
* The Open Sea
* The Towering Mountains
* The Frozen North
* The Blasted Wasteland

Chose a tell—a physical attribute that marks you as born of the soil—that
reflects the spirit of your land. It may be an animal feature like antlers or
leopard’s spots or something more general: hair like leaves or eyes of
glittering crystal. Your tell remains no matter what shape you take.
  """


contentByNatureSustained =
    """
You don’t need to eat or drink. If a move tells you to mark off a ration just
ignore it.
  """


contentSpiritTongue =
    """
The grunts, barks, chirps, and calls of the creatures of the wild are as
language to you. You can understand any animal native to your land or akin to
one whose essence you have studied.
  """


contentShapeshifter =
    """
When you call upon the spirits to change your shape, roll+Wis.

* On a 10+ hold 3.
* On a 7–9 hold 2.
* On a miss hold 1 in addition to whatever the GM says.


You may take on the physical form of any species whose essence you have studied
or who lives in your land: you and your possessions meld into a perfect copy of
the species’ form. You have any innate abilities and weaknesses of the form:
claws, wings, gills, breathing water instead of air. You still use your normal
stats but some moves may be harder to trigger—a housecat will find it hard to
do battle with an ogre. The GM will also tell you one or more moves associated
with your new form. Spend 1 hold to make that move. Once you’re out of hold,
you return to your natural form. At any time, you may spend all your hold and
revert to your natural form.
  """


contentStudiedEssence =
    """
When you spend time in contemplation of an animal spirit, you may add its
species to those you can assume using shapeshifting.
  """


contentPoisoner =
    """
You’ve mastered the care and use of a poison. Choose a poison from the list
below; that poison is no longer dangerous for you to use. You also start with
three uses of the poison you choose. Whenever you have time to gather materials
and a safe place to brew you can make three uses of the poison you choose for
free. Note that some poisons are applied, meaning you have to carefully apply it
to the target or something they eat or drink. Touch poisons just need to touch
the target, they can even be used on the blade of a weapon.

* Oil of Tagit (applied): The target falls into a light sleep
* Bloodweed (touch): The target deals -1d4 damage ongoing until cured
* Goldenroot (applied): The target treats the next creature they see
  as a trusted ally, until proved otherwise
* Serpent’s Tears (touch): Anyone dealing damage to the target
  rolls twice and takes the better result.
  """


contentBackstab =
    """
When you attack a surprised or defenseless enemy with a melee weapon, you can
choose to deal your damage or roll+DEX.

* On a 10+ choose two.
* On a 7–9 choose one.
  * You don’t get into melee with them
  * You deal your damage+1d6
  * You create an advantage, +1 forward to you or an ally acting on it
  * Reduce their armor by 1 until they repair it
"""


contentTricksOfTheTrade =
    """
When you pick locks or pockets or disable traps, roll+DEX.

* On a 10+, you do it, no problem.

* On a 7–9, you still do it, but the GM will offer you two options between
  suspicion, danger, or cost.
"""


contentTrapExpert =
    """
When you spend a moment to survey a dangerous area, roll+DEX.

* On a 10+, hold 3.
* On a 7–9, hold 1. Spend your hold as you walk through the area to ask these
  questions:
  * Is there a trap here and if so, what activates it?
  * What does the trap do when activated?
  * What else is hidden here?

"""


contentProfessional =
    """
You are a professional. When you spout lore or discern realities about criminal
activities, take +1.
"""


contentPortStorm =
    """
When you return to a civilized settlement you’ve visited before, tell the GM
when you were last here. They’ll tell you how it’s changed since then.
"""


contentCharmingOpen =
    """
When you speak frankly with someone, you can ask their player a question from
the list below. They must answer it truthfully, then they may ask you a question
from the list (which you must answer truthfully).

* Whom do you serve?
* What do you wish I would do?
* How can I get you to ____________________ ?
* What are you really feeling right now?
* What do you most desire?

"""


contentThePilot =
    """
The Pilot is responsible for adapting to all the problems that arise from
actually trying to get somewhere in space. They have developed abilities
that draw from the AI Matrix directly, without a guide.
"""


contentThePilotTwist =
    """
"""


contentThePilotFinale =
    """
"""


contentTheEngineer =
    """
The Engineering Officer is responsible for maintaining the Solar Crawler's
Engine while on the voyage. They are a shapeshifting android, capable of
becoming creatures of all sizes to keep the engine running and defend it.
  """


contentTheEngineerTwist =
    """
"""


contentTheEngineerFinale =
    """
"""


contentTheNavigator =
    """
The Navigation Officer is responsible for charting out how to get from one
planet to another, leaving the matter of executing on this plan to the Pilot. In
space combat, they are responsible for artillery, as well as tracking those who
flee.
  """


contentTheNavigatorTwist =
    """
  """


contentTheNavigatorFinale =
    """
  """


contentSpellWizardContactSpirits =
    """
Name the spirit you wish to contact (or leave it to the GM). You pull that
creature through the planes, just close enough to speak to you. It is bound to
answer any one question you ask to the best of its ability.
"""


contentSpellWizardAlarm =
    """
Walk a wide circle as you cast this spell. Until you prepare spells again your
magic will alert you if a creature crosses that circle. Even if you are asleep,
the spell will shake you from your slumber.
"""


contentTheBiomechanic =
    """
The Biomechanic's job is to fix and modify cyborgs, themselves included. They
pledge service to AI Overminds, who in return grant them special abilities. The
Biomechanic's abilities makes them a bridge between the land of the living and
the discorporate, and everything in-between.
    """


contentTheBiomechanicTwist =
    """
"""


contentTheBiomechanicFinale =
    """
"""


contentTheScientist =
    """
The Scientist is a guest of the Captain because they are the architect of Mech
technology, used throughout the astroid mining operation. They are from
Planetary Terra, a foreign place for the rest of the cyborgs. They don't have
a job onboard the Solar Crawler, but get invited to all the important meetings
and on all the missions.
"""


contentTheScientistTwist =
    """
"""


contentTheScientistFinale =
    """
"""


contentFullPlatePackingSteel =
    """
You ignore the clumsy tag on armor you wear.
"""


contentWhatAreYouWaitingFor =
    """
When you cry out a challenge to your enemies, roll+Con.

* On a 10+ they treat you as the most obvious threat to be dealt with and
  ignore your companions, take +2 damage ongoing against them.
* On a 7–9 only a few (the weakest or most foolhardy among them) fall prey
  to your taunting.
"""


contentMusclebound =
    """
While you wield a weapon it gains the forceful and messy tags.
"""


contentTheUpperHand =
    """
You take +1 ongoing to last breath rolls. When you take your last breath, on
a 7–9 you make an offer to Death in return for your life. If Death accepts he
will return you to life. If not, you die.
"""


contentHercApp =
    """
Others may content themselves with just a taste of wine, or dominion over
a servant or two, but you want more. Choose two appetites. While pursuing one of
your appetites if you would roll for a move, instead of rolling 2d6 you roll
1d6+1d8. If the d6 is the higher die of the pair, the GM will also introduce
a complication or danger that comes about due to your heedless pursuits.

* Pure destruction
* Power over others
* Mortal pleasures
* Conquest
* Riches and property
* Fame and glory
"""


contentClericCastSpell =
    """
When you unleash a spell granted to you by your deity, roll+Wis.

* On a 10+, the spell is successfully cast and your deity does not revoke the
  spell, so you may cast it again.
* On a 7–9, the spell is cast, but choose one:
  * You draw unwelcome attention or put yourself in a spot. The GM will tell you
    how.
  * Your casting distances you from your deity—take -1 ongoing to cast
    a spell until the next time you commune.
  * After you cast it, the spell is revoked by your deity. You cannot
    cast the spell again until you commune and have it granted to you.

Note that maintaining spells with ongoing effects will sometimes cause a penalty
to your roll to cast a spell.
"""


contentTurnUndead =
    """
When you hold your holy symbol aloft and call on your deity for protection,
roll+Wis.

* On a 7+, so long as you continue to pray and brandish your holy symbol, no
  undead may come within reach of you.
* On a 10+, you also momentarily daze intelligent undead and cause mindless
  undead to flee. Aggression breaks the effects and they are able to act as
  normal. Intelligent undead may still find ways to harry you from afar. They’re
  clever like that.
"""


contentDivineGuidance =
    """
When you petition your deity according to the precept of your religion, you are
granted some useful knowledge or boon related to your deity’s domain. The GM
will tell you what.
"""


contentDeity =
    """
You serve and worship some deity or power which grants you spells. Give your god
a name (maybe Helferth, Sucellus, Zorica or Krugon the Bleak) and choose your
deity’s domain:

* Healing and Restoration
* Bloody Conquest
* Civilization
* Knowledge and Hidden Things
* The Downtrodden and Forgotten
* What Lies Beneath

Choose one precept of your religion:

* Your religion preaches the sanctity of suffering, add Petition: Suffering
* Your religion is cultish and insular, add Petition: Gaining Secrets
* Your religion has important sacrificial rites, add Petition: Offering
* Your religion believes in trial by combat, add Petition: Personal Victory
"""


contentSpellClericSpeakWithDead =
    """
A corpse converses with you briefly. It will answer any three questions you pose
to it to the best of the knowledge it had in life and the knowledge it gained in
death.
"""


contentSpellClericCureLightWounds =
    """
At your touch wounds scab and bones cease to ache. Heal an ally you touch of 1d8
damage.
"""


contentSpellClericGuidance =
    """
The symbol of your deity appears before you and gestures towards the direction
or course of action your deity would have you take then disappears. The message
is through gesture only; your communication through this spell is severely
limited.
"""


contentSpellClericSanctify =
    """
Food or water you hold in your hands while you cast this spell is consecrated by
your deity. In addition to now being holy or unholy, the affected substance is
purified of any mundane spoilage.
"""


contentSpellClericLight =
    """
An item you touch glows with divine light, about as bright as a torch. It gives
off no heat or sound and requires no fuel but is otherwise like a mundane torch.
You have complete control of the color of the flame. The spell lasts as long as
it is in your presence.
"""


contentDiscernRealities =
    """
When you closely study a situation or person, roll+Wis.

* On a 10+, ask the GM 3 questions from the list below.
* On a 7–9, ask 1.

Either way, take +1 forward when acting on the answers.

* What happened here recently?
* What is about to happen?
* What should I be on the lookout for?
* What here is useful or valuable to me?
* Who’s really in control here?
* What here is not what it appears to be?

"""


contentSpoutLore =
    """
When you consult your accumulated knowledge about something, roll+Int.

* On
a 10+, the GM will tell you something interesting and useful about the subject
relevant to your situation.
* On a 7–9, the GM will only tell you something
interesting—it’s on you to make it useful.

The GM might ask you “How do you know
this?” Tell them the truth, now.
"""


contentParley =
    """
When you have leverage on a GM Character and manipulate them, roll+Cha. Leverage
is something they need or want.

* On a 10+, they do what you ask if you first promise what they ask of you.
* On a 7–9, they will do what you ask, but need some concrete assurance of your
  promise, right now.

"""


contentDefend =
    """
When you stand in defense of a person, item, or location under attack, roll+Con.

* On a 10+, hold 3.
* On a 7–9, hold 1.

As long as you stand in defense, when you or the thing you
defend is attacked you may spend hold, 1 for 1, to choose an option:

* Redirect an attack from the thing you defend to yourself
* Halve the attack’s effect or damage
* Open up the attacker to an ally giving that ally +1 forward against
  the attacker
* Deal damage to the attacker equal to your level

"""


contentVolley =
    """
When you take aim and shoot at an enemy at range, roll+Dex.

* On a 10+, you have a clear shot—deal your damage.
* On a 7–9, choose one (whichever you choose you deal your damage):
  * You have to move to get the shot placing you in danger as described by the
    GM
  * You have to take what you can get: -1d6 damage
  * You have to take several shots, reducing your ammo by one
"""


contentHackSlash =
    """
When you attack an enemy in melee, roll+Str.

* On a 10+, you deal your damage to
the enemy and avoid their attack. At your option, you may choose to do +1d6
damage but expose yourself to the enemy’s attack.
* On a 7–9, you deal your
damage to the enemy and the enemy makes an attack against you.
"""


contentTheCaptain =
    """
The Captain's job is to get the cyborgs through their "day" long hallucination
in one piece. The Captain leads with the First Mate, asks the Officers for
guidance, and works with the Pilot, Biomechanic, and Scientist for their
specialized skills.
"""


contentTheCaptainTwist =
    """
"""


contentTheCaptainFinale =
    """
"""


contentTheFirstMate =
    """
The First Mate leads with the Captain, and if the Captain discorporates, takes
over their duties. The First Mate is capable of projecting images and music into
the minds of others, and works this talent into performances with useful
effects.
  """


contentTheFirstMateTwist =
    """
"""


contentTheFirstMateFinale =
    """
"""


contentSecurityOfficer =
    """
The Security Officer is responsible for the overall protection of the cyborgs
through their journey. Space Combat in any form is their speciality. With their
advice and expertise, there are few enemies that can get through the Solar
Crawler's defenses.
    """


contentSecurityOfficerTwist =
    """
"""


contentSecurityOfficerFinale =
    """
"""


contentIntelligence =
    """
The Intelligence Officer is responsible for finding threats to the Solar Crawler
before they materialize. They are an expert in space traps, cybernetic locks, and space
crime of all kinds, and maintain the arts of poison and ambush as well.
  """


contentIntelligenceTwist =
    """
  """


contentIntelligenceFinale =
    """
"""


contentUseExternalMove =
    """
Every monster in an adventure has moves associated with it, as do many
locations. A monster or location move is just a description of what that
location or monster does, maybe “hurl someone away” or “bridge the planes.” If
a player move (like hack and slash) says that a monster gets to make an attack,
make an aggressive move with that monster.

The overarching dangers of the adventure also have moves associated with them.
Use these moves to bring that danger into play, which may mean more monsters.
              """


contentSidePanel =
    """
# World Summary

Dī Penātēs Solar Crawler makes its way slowly across the system...

Select your character and their level in the menu dropdowns above. You can
select actions to perform; for some actions, make a roll to determine possible
consequences.

"""


contentPrepHidden =
    """
Hidden...
"""


contentPrep =
    """
# Prep

## Contents

1. The 26th C Solar System
2. The Solar Crawler
3. The Captain's Mission
4. The Smuggler's Scheme
5. The Officers' Plot
6. The Scientist's Revolution
7. Front : The Feelers
8. Front : The Discomfit

## The 26th C Solar System

The 26th Century Solar System still starts with the planet formerly known as
Earth. Terra, the third planet from the sun, has been outfitted with a Space
Elevator. Robots are mining the planet for resourcs to be shipped off-world.

There are cloud-cities in the atmosphere of Venus, thought to be the future
direction of civilization.

There is a terraforming society underway in Mars, complete with underground
tunnel systems.

There is an astroid mining operation on Ceres.

## The Solar Crawler

The Solar Crawler is unique as the largest freighter/cruiser in the solar
system. It has a population in the low thousands, but could accomodate hundreds
of


## The Captain's Mission

The Captain's Mission is to deliver an ice shipment from Ceres to Venus, and
payment back to Ceres.

## The Smuggler's Scheme

The Smuggler is trying to make four drop-offs: at Mars, at Terra, at Venus, and
finally at Ceres.

## The Officers' Plot

The Officers are plotting to overthrow the Captain and First Mate, installing
the Security Officer as the captain. They want to deliver the ice to the
Revolutionaries on Terra, who plan to retrofit the Solar Crawler as an
Interstellar Crawler, and find a new home across the stars.

## The Scientist's Revolution

The Scientist is trying to help their community on Terra, who are building
a warp drive to retrofit onto the Solar Crawler, and escape the solar system to
travel the stars.

## The Feelers and the End of the Revolutionaries

The Feelers are searching for the Scientist and the Smuggler. They thought that
the target was the Navigation Officer and the Security Officer, but they have
corrected themselves, and are now scanning the group for the correct targets.

## The Discomfit and the End of the Solar Crawler
"""


contentBendBarsLiftGates =
    """
When you use pure strength to destroy an inanimate obstacle, roll+Str.

* On a 10+, choose 3.
* On a 7-9 choose 2.
  * It doesn’t take a very long time
  * Nothing of value is damaged
  * It doesn’t make an inordinate amount of noise
  * You can fix the thing again without a lot of effort
  """


contentArmored =
    """
You ignore the clumsy tag on armor you wear.
"""


contentSignatureWeapon =
    """
This is your weapon. There are many like it, but this one is yours. Your weapon is your best friend. It is your life. You master it as you master your life. Your weapon, without you, is useless. Without your weapon, you are useless. You must wield your weapon true.

Choose a base description, all are 2 weight:

* Sword
* Axe
* Hammer
* Spear
* Flail
* Fists

Choose the range that best fits your weapon:

* Hand
* Close
* Reach

Choose two enhancements:

* Hooks and spikes. +1 damage, but +1 weight.
* Sharp. +2 piercing.
* Perfectly weighted. Add precise.
* Serrated edges. +1 damage.
* Glows in the presence of one type of creature, your choice.
* Huge. Add messy and forceful.
* Versatile. Choose an additional range.
* Well-crafted. -1 weight.

Choose a look:

* Ancient
* Unblemished
* Ornate
* Blood-stained
* Sinister

"""


contentTurnMoveBack =
    """
Think about the benefits a move might grant a character and turn them around in a negative way. Alternately, grant the same advantage to someone who has it out for the characters. If Ivy has learned of Duke Horst’s men approaching from the east, maybe a scout has spotted her, too.
              """


contentHuntAndTrack =
    """
When you follow a trail of clues left behind by passing creatures, roll+WIS.

* On a 7+, you follow the creature’s trail until there’s a significant change in
  its direction or mode of travel.

* On a 10+, you also choose 1:
  * Gain a useful bit of information about your quarry, the GM will tell you
    what
  * Determine what caused the trail to end
  """


contentCalledShot =
    """
When you attack a defenseless or surprised enemy at range, you can choose to
deal your damage or name your target and roll+DEX.

* Head
  * 10+: As 7–9, plus your damage
  * 7-9: They do nothing but stand and drool for a few moments.
* Arms
  * 10+: As 7-9, plus your damage
  * 7-9: They drop anything they’re holding.
* Legs
  * 10+: As 7-9, plus your damage
  * 7-9: They’re hobbled and slow moving.
"""


contentAnimalCompanion =
    """
You have a supernatural connection with a loyal animal. You can’t talk to it per se but it always acts as you wish it to. Name your animal companion and choose a species:

Wolf, cougar, bear, eagle, dog, hawk, cat, owl, pigeon, rat, mule

Choose a base:

* Ferocity +2, Cunning +1, 1 Armor, Instinct +1
* Ferocity +2, Cunning +2, 0 Armor, Instinct +1
* Ferocity +1, Cunning +2, 1 Armor, Instinct +1
* Ferocity +3, Cunning +1, 1 Armor, Instinct +2

Choose as many strengths as its ferocity:

Fast, burly, huge, calm, adaptable, quick reflexes, tireless, camouflage, ferocious, intimidating, keen senses, stealthy

Your animal companion is trained to fight humanoids. Choose as many additional trainings as its cunning:

Hunt, search, scout, guard, fight monsters, perform, labor, travel

Choose as many weaknesses as its instinct:

Flighty, savage, slow, broken, frightening, forgetful, stubborn, lame
Command

When you work with your animal companion on something it’s trained in

* and you attack the same target, add its ferocity to your damage
* and you track, add its cunning to your roll
* and you take damage, add its armor to your armor
* and you discern realities, add its cunning to your roll
* and you parley, add its cunning to your roll
* and someone interferes with you, add its instinct to their roll

  """


contentLayOnHands =
    """
When you touch someone, skin to skin, and pray for their well-being , roll+CHA.

* On a 10+ you heal 1d8 damage or remove one disease.
* On a 7–9, they are healed, but the damage or disease is transferred to you.
"""


contentLaw =
    """
When you give an NPC an order based on your divine authority, roll+Cha.

* On a 7+, they choose one:
  * Do what you say
  * Back away cautiously, then flee
  * Attack you
* On a 10+, you also take +1 forward against them.
* On a miss, they do as they please and you take -1 forward against them.
"""


contentQuest =
    """
When you dedicate yourself to a mission through prayer and ritual cleansing, state what you set out to do:

* Slay ___________________, a great blight on the land
* Defend ___________________ from the iniquities that beset them
* Discover the truth of _______________

Then choose up to two boons:

* An unwavering sense of direction to _______________________.
* Invulnerability to ___________________ (e.g., edged weapons, fire, enchantment, etc.)
* A mark of divine authority
* Senses that pierce lies
* A voice that transcends language
* A freedom from hunger, thirst, and sleep

The GM will then tell you what vow or vows is required of you to maintain your blessing:

* Honor (forbidden: cowardly tactics and tricks)
* Temperance (forbidden: gluttony in food, drink, and pleasure of the flesh)
* Piety (required: observance of daily holy services)
* Valor (forbidden: suffering an evil creature to live)
* Truth (forbidden: lies)
* Hospitality (required: comfort to those in need, no matter who they are)

"""


contentSpellWizardPolymorph =
    """
Your touch reshapes a creature entirely, they stay in the form you craft until
you cast a spell. Describe the new shape you craft, including any stat changes,
significant adaptations, or major weaknesses. The GM will then tell you one or
more of these:

* The form will be unstable and temporary
* The creature’s mind will be altered as well
* The form has an unintended benefit or weakness
"""


contentSpellWizardFireball =
    """
You evoke a mighty ball of flame that envelops your target and everyone nearby,
inflicting 2d6 damage which ignores armor.
"""


contentSpellWizardSleep =
    """
1d4 enemies you can see of the GM’s choice fall asleep. Only creatures capable
of sleeping are affected. They awake as normal: loud noises, jolts, pain.
"""


contentSpellWizardMagicMissile =
    """
Projectiles of pure magic spring from your fingers. Deal 2d4 damage to one
target.
"""


contentSpellWizardDispelMagic =
    """
Choose a spell or magic effect in your presence: this spell rips it apart.
Lesser spells are ended, powerful magic is just reduced or dampened so long as
you are nearby.
"""


contentQuickStudy =
    """
When you see the effects of an arcane spell, ask the GM the name of the spell
and its effects. You take +1 when acting on the answers.
"""


contentCounterspell =
    """
When you attempt to counter an arcane spell that will otherwise affect you,
stake one of your prepared spells on the defense and roll+Int.

* On a 10+, the spell is countered and has no effect on you.
* On a 7-9, the spell is countered and you forget the spell you staked.

Your counterspell protects only you; if the countered spell has other targets
they get its effects.
"""


contentFountOfKnowledge =
    """
When you spout lore about something no one else has any clue about, take +1.
"""


contentLogical =
    """
When you use strict deduction to analyze your surroundings, you can discern
realities with INT instead of WIS.
"""


contentElementalMastery =
    """
When you call on the primal spirits of fire, water, earth or air to perform
a task for you roll+Wis.


* On a 10+ choose two.
* On a 7–9 choose one.
* On a miss, some catastrophe occurs as a result of your calling.
  * The effect you desire comes to pass
  * You avoid paying nature’s price
  * You retain control
"""


contentRedOfToothAndClaw =
    """
When you are in an appropriate animal form (something dangerous) increase your
damage to d8.
"""


contentCommunionOfWhispers =
    """
When you spend time in a place, making note of its resident spirits and calling
on the spirits of the land, roll+Wis. You will be granted a vision of
significance to you, your allies, and the spirits around you.


* On a 10+ the vision will be clear and helpful to you.
* On a 7–9 the vision is unclear, its meaning murky.
* On a miss, the vision is upsetting, frightening, or traumatizing. The GM will
  describe it. Take -1 forward.

"""


contentThingTalker =
    """
You see the spirits in the sand, the sea and the stone. You may now apply your
spirit tongue, shapeshifting and studied essence to inanimate natural objects
(plants and rocks) or creatures made thereof, as well as animals. Thing-talker
forms can be exact copies or can be mobile vaguely humanoid-shaped entities.
"""


contentGodAmidstTheWastes =
    """
Dedicate yourself to a deity (name a new one or choose one that’s already been
established). You gain the commune and cast a spell cleric moves. When you
select this move, treat yourself as a cleric of level 1 for using spells. Every
time you gain a level thereafter, increase your effective cleric level by 1.
"""


contentOrisonForGuidance =
    """
When you sacrifice something of value to your deity and pray for guidance, your
deity tells you what it would have you do. If you do it, mark experience.
"""


contentDevotedHealer =
    """
When you heal someone else of damage, add your level to the amount of damage
healed.
"""


contentDivineIntervention =
    """
When you commune you get 1 hold and lose any hold you already had. Spend that
hold when you or an ally takes damage to call on your deity, they intervene with
an appropriate manifestation (a sudden gust of wind, a lucky slip, a burst of
light) and negate the damage.
"""


contentSerenity =
    """
When you cast a spell you ignore the first -1 penalty from ongoing spells.
"""


contentSpellClericRevelation =
    """
Your deity answers your prayers with a moment of perfect understanding. The
GM will shed light on the current situation. When acting on the information, you
take +1 forward.
"""


contentSpellClericCureModerateWounds =
    """
You staunch bleeding and set bones through magic. Heal an ally you touch of 2d8
damage.
"""


contentSpellClericRes =
    """
Tell the GM you would like to resurrect a corpse whose soul has not yet fully
departed this world. Resurrection is always possible, but the GM will give you
one or more (possibly all) of these conditions to fulfill:

* It’s going to take days/weeks/months
* You must get help from
* It will require a lot of money
* You must sacrifice to do it

The GM may, depending on the circumstances, allow you to resurrect the corpse
now, with the understanding that the conditions must be met before it’s
permanent, or require you to meet the conditions before the corpse is
resurrected.
"""


contentSpellClericBless =
    """
Your deity smiles upon a combatant of your choice. They take +1 ongoing so long
as battle continues and they stand and fight. While this spell is ongoing you
take -1 to cast a spell.
"""


contentSpellClericDarkness =
    """
Choose an area you can see: it’s filled with supernatural darkness and shadow.
While this spell is ongoing you take -1 to cast a spell.
"""


contentSpellClericAnimateDead =
    """
You invoke a hungry spirit to possess a recently-dead body and serve you. This
creates a zombie that follows your orders to the best of its limited abilities.
Treat the zombie as a character, but with access to only the basic moves. It has
a +1 modifier for all stats and 1 HP. The zombie also gets your choice of 1d4 of
these traits:

* It’s talented. Give one stat a +2 modifier.
* It’s durable. It has +2 HP for each level you have.
* It has a functioning brain and can complete complex tasks.
* It does not appear obviously dead, at least for a day or two.

The zombie lasts until it is destroyed by taking damage in excess of its HP, or
until you end the spell. While this spell is ongoing you take -1 to cast
a spell.
"""


contentSpellClericMagicWeapon =
    """
The weapon you hold while casting does +1d4 damage until you dismiss this spell.
While this spell is ongoing you take -1 to cast a spell.
"""


contentSpellClericCauseFear =
    """
Choose a target you can see and a nearby object. The target is afraid of the
object so long as you maintain the spell. Their reaction is up to them: flee,
panic, beg, fight. While this spell is ongoing you take -1 to cast a spell. You
cannot target entities with less than animal intelligence (magical constructs,
undead, automatons, and the like).
"""


contentSpellClericHoldPerson =
    """
Choose a person you can see. Until you cast a spell or leave their presence they
cannot act except to speak. This effect ends immediately if the target takes
damage from any source.
"""


contentSpellClericSanctuary =
    """
As you cast this spell, you walk the perimeter of an area, consecrating it to
your deity. As long as you stay within that area you are alerted whenever
someone acts with malice within the sanctuary (including entering with harmful
intent). Anyone who receives healing within a sanctuary heals +1d4 HP.
"""


contentCheapShot =
    """
When using a precise or hand weapon, your backstab deals an extra +1d6 damage.
"""


contentShootFirst =
    """
You’re never caught by surprise. When an enemy would get the drop on you, you
get to act first instead.
"""


contentConnections =
    """
When you put out word to the criminal underbelly about something you want or
need, roll+CHA.

* On a 10+, someone has it, just for you.
* On a 7–9, you’ll have to settle for something close or it comes with strings
  attached, your call.
"""


contentCautious =
    """
When you use trap expert you always get +1 hold, even on a 6-.
"""


contentHeirloom =
    """
When you consult the spirits that reside within your signature weapon, they will
give you an insight relating to the current situation, and might ask you some
questions in return, roll+CHA.

* On a 10+, the GM will give you good detail.
* On a 7-9, the GM will give you an impression.
"""


contentArmorMastery =
    """
When you make your armor take the brunt of damage dealt to you, the damage is
negated but you must reduce the armor value of your armor or shield (your
choice) by 1. The value is reduced each time you make this choice. If the
reduction leaves the item with 0 armor it is destroyed.
"""


contentInterrogator =
    """
When you parley using threats of impending violence as leverage, you may use STR
instead of CHA.
"""


contentMerciless =
    """
When you deal damage, deal +1d4 damage.
"""


contentHealingSong =
    """
When you heal with arcane art, you heal +1d8 damage.
"""


contentViciousCacophony =
    """
When you grant bonus damage with arcane art, you grant an extra +1d4 damage.
"""


contentEldritchTones =
    """
Your arcane art is strong, allowing you to choose two effects instead of one.
"""


contentMulticlassDabbler =
    """
Get one move from another class. Treat your level as one lower for choosing the
move.
"""


contentExterminus =
    """
When you speak aloud your promise to defeat an enemy, you deal +2d4 damage
against that enemy and -4 damage against anyone else. This effect lasts until
the enemy is defeated. If you fail to defeat the enemy or give up the fight, you
can admit your failure, but the effect continues until you find a way to redeem
yourself.
"""


contentHospitaller =
    """
When you heal an ally, you heal +1d8 damage.
"""


contentBloodyAegis =
    """
When you take damage you can grit your teeth and accept the blow. If you do you
take no damage but instead suffer a debility of your choice. If you already have
all six debilities you can’t use this move.
"""


contentDivineFavor =
    """
Dedicate yourself to a deity (name a new one or choose one that’s already been
established). You gain the commune and cast a spell cleric moves. When you
select this move, treat yourself as a cleric of level 1 for using spells. Every
time you gain a level thereafter, increase your effective cleric level by 1.
"""


contentBlotOutTheSun =
    """
When you volley you may spend extra ammo before rolling. For each point of ammo
spent you may choose an extra target. Roll once and apply damage to all targets.
"""


contentWildEmpathy =
    """
You can speak with and understand animals.
"""


contentFamiliarPrey =
    """
When you spout lore about a monster you use WIS instead of INT.
"""


contentEyeForWeakness =
    """
When you discern realities add “What here is weak or vulnerable?” to the list of
questions you can ask.
"""


contentSmash =
    """
When you hack and slash, on a 12+ deal your damage and choose something physical
your target has (a weapon, their position, a limb): they lose it.
"""


contentSamson =
    """
You may take a debility to immediately break free of any physical or mental
restraint.
"""


contentWideWanderer =
    """
You’ve traveled the wide world over. When you arrive someplace ask the GM about
any important traditions, rituals, and so on, they’ll tell you what you need to
know.
"""


contentSpellClericTrueSeeing =
    """
Your vision is opened to the true nature of everything you lay your eyes on. You
pierce illusions and see things that have been hidden. The GM will describe the
area before you ignoring any illusions and falsehoods, magical or otherwise.
While this spell is ongoing you take -1 to cast a spell.
"""


contentFronts =
    """
# Fronts

## Planetary Terra Alliance

### Dangers

#### Plague of the Undead (*impulse: to spread*)

##### Moves
* Assault a bastion of civilization
* Embrace internal chaos
* Change direction suddenly
* Overwhelm a weaker force
* Perform a show of dominance
* Abandon an old home, find a new one
* Grow in size by breeding or conquest
* Appoint a champion
* Declare war and act upon that declaration without hesitation or
  deliberation

#### Cabal (*impulse: to absorb those in power, to grow*)

##### Moves
* Attack someone by stealthy means (kidnapping, etc.)
* Attack someone directly (with a gang or single assailant)
* Absorb or buy out someone important (an ally, perhaps)
* Influence a powerful institution (change a law, manipulate
  doctrine)
* Establish a new rule (within the organization)
* Claim territory or resources
* Negotiate a deal
* Observe a potential foe in great detail

### The Martian Alliance

#### Shadowland (*impulse: to corrupt or consume the living*)

##### Moves
* Vomit forth a lesser monster
* Spread to an adjacent place
* Lure someone in
* Grow in intensity or depth
* Leave a lingering e ect on an inhabitant or visitor
* Hide something from sight
* Offer power
* Dampen magic or increase its effects
* Confuse or obfuscate truth or direction
* Corrupt a natural law

#### Ancient Curse (*impulse: to ensnare*)
* Learn forbidden knowledge
* Cast a spell over time and space
* Attack a foe with magic, directly or otherwise
* Spy on someone with a scrying spell
* Recruit a follower or toady
* Tempt someone with promises
* Demand a sacrifice

### Grim Portents
1. Stop the Solar Crawler from leaving Mars
2. Frame the Solar Crawler on Venus
3. Stop the Solar Crawler from helping the Planetary Terrans

### Impending Doom
* Destruction (apocalypse, ruin, and woe)
"""
