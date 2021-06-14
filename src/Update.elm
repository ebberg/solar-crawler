module Update exposing (Msg(..), setSeed)

import Model exposing (Model, RollType, ScreenType)
import Random
import Time exposing (Time)


type Msg
    = Noop
    | ChangeCharacter String
    | ChangeScreenType ScreenType
    | ChangeLevel String
    | ChangeRoom String
    | SetSeed Time
    | Roll RollType
    | ResetRoll


setSeed : Model -> Time -> ( Model, Cmd Msg )
setSeed model currentTime =
    let
        seed0 =
            Random.initialSeed (round (Time.inMilliseconds currentTime))
    in
    ( { model
        | seed = seed0
      }
    , Cmd.none
    )
