module View exposing (rollResult, viewContent, viewFooter, viewHeader)

import Content exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)
import Markdown
import Model
    exposing
        ( Character
        , CharacterType(..)
        , Model
        , Move
        , MoveSet
        , MoveType(..)
        , RollType(..)
        , ScreenType(..)
        , addLevelMods
        , characters
        , displayModFromStat
        , filterLevelMoves
        , getMoveTypes
        , house
        , hp
        , isActiveCharacter
        , isActiveScreenType
        , maybeGetCharacter
        , modFromStat
        , moveTypeToString
        , theDirectorMoves
        )
import Random exposing (Seed)
import Update exposing (Msg(..))


viewHeader : Model -> Html Msg
viewHeader model =
    nav [ class "navbar navbar-expand-lg navbar-dark bg-primary" ]
        [ span [ class "navbar-brand" ] [ text "Dī Penātēs Solar Crawler v0.2.5" ]
        , select
            [ onInput ChangeCharacter
            , class
                "custom-select custom-select-lg"
            ]
            [ option [] [ text "Select Player" ]
            , option [] [ text "Captain Lola (Paladin)" ]
            , option [] [ text "Dar (Bard)" ]
            , option [] [ text "Ix (Fighter)" ]
            , option [] [ text "Tommy the Cat (Thief)" ]
            , option [] [ text "ZarrN (Ranger)" ]
            , option [] [ text "Aero (Druid) " ]
            , option [] [ text "Mac (Wizard)" ]
            , option [] [ text "Drav (Cleric)" ]
            , option [] [ text "Dr Pachinka (Barbarian)" ]
            , option [] [ text "GM" ]
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


selectRoom : Html Msg
selectRoom =
    select
        [ onInput ChangeRoom
        , class
            "custom-select custom-select-lg"
        ]
        ([ option [] [ text "Select Room" ] ]
            ++ List.map (\x -> option [] [ text x.name ]) house
        )


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
        [ viewCharacterName model
        , div [ class "row" ]
            [ div [ class "col-md" ]
                [ viewMenu model
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
