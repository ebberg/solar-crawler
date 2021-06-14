module Model
    exposing
        ( Character
        , CharacterType(..)
        , Model
        , Move
        , MoveSet
        , MoveType(..)
        , RollType(..)
        , Room
        , ScreenType(..)
        , addLevelMods
        , characters
        , displayModFromStat
        , extractMoveType
        , filterLevelMoves
        , getMoveTypes
        , house
        , hp
        , isActiveCharacter
        , isActiveScreenType
        , levelStringToLevel
        , maybeGetCharacter
        , modFromStat
        , moveTypeToString
        , playerToCharacterType
        , roomStairwell
        , theDirectorMoves
        )

import Content exposing (..)
import Random exposing (Seed)


-- SECTION: TYPES


type alias Model =
    { characterType : CharacterType
    , screenType : ScreenType
    , room : Room
    , level : Int
    , mod : Int
    , seed : Seed
    , roll : String
    }


type alias Room =
    { name : String
    , qualities : List String
    }


house : List Room
house =
    [ roomStairwell
    , roomDining
    , roomLiving
    , roomSun
    , roomLibrary
    ]


roomStairwell : Room
roomStairwell =
    { name = "Stairwell", qualities = [] }


roomDining : Room
roomDining =
    { name = "Dining Room", qualities = [] }


roomSun : Room
roomSun =
    { name = "Sun Room", qualities = [] }


roomLibrary : Room
roomLibrary =
    { name = "Library", qualities = [] }


roomLiving : Room
roomLiving =
    { name = "Living Room", qualities = [] }


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
        "GM" ->
            TheDirector

        "Captain Lola (Paladin)" ->
            TheCaptain

        "Dar (Bard)" ->
            TheFirstMate

        "Ix (Fighter)" ->
            TheSecurity

        "Tommy the Cat (Thief)" ->
            TheIntelligence

        "Mac (Wizard)" ->
            ThePilot

        "Drav (Cleric)" ->
            TheBiomechanic

        "Aero (Druid)" ->
            TheEngineer

        "Dr Pachinka (Barbarian)" ->
            TheScientist

        "ZarrN (Ranger)" ->
            TheNavigator

        "Select Player" ->
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
