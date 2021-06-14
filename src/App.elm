module App exposing (main)

--import Html.Events exposing (onClick, onInput)

import Html exposing (..)
import Html.Attributes exposing (..)
import Markdown
import Model
    exposing
        ( CharacterType(..)
        , Model
        , ScreenType(..)
        , house
        , levelStringToLevel
        , playerToCharacterType
        , roomStairwell
        )
import Random exposing (Seed)
import Task
import Time exposing (Time)
import Update exposing (Msg(..), setSeed)
import View exposing (rollResult, viewContent, viewFooter, viewHeader)


main =
    Html.program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }



-- INIT


init : ( Model, Cmd Msg )
init =
    ( { characterType = SelectCharacter
      , screenType = MakeMove
      , room = roomStairwell
      , level = 1
      , mod = 0
      , seed = Random.initialSeed 1 -- Placeholder until the Cmd runs
      , roll = ""
      }
    , Task.perform SetSeed Time.now
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

        ChangeRoom roomString ->
            ( let
                room =
                    case List.head (List.filter (\x -> x.name == roomString) house) of
                        Just room ->
                            room

                        Nothing ->
                            { name = "Error room not found", qualities = [] }
              in
              { model | room = room }
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


view : Model -> Html Msg
view model =
    div []
        [ viewHeader model
        , br [] []
        , viewContent model
        , br [] []
        , viewFooter
        ]



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none
